/* eslint-disable import/prefer-default-export */
import { keystore } from '../Keystore';
import { get, setGet } from '../../Core/GetterAndSetter';
import { capitalize } from '../../Core/StringUtil';

// ----------------------------------------------------------------------------
// proxy(publicAPI, model, sectionName, propertyUI)
//
//    - sectionName: Name of the section for UI
//    - propertyUI: List of props with their UI description
//
// Generated API
//  getProxyId() : String
//  listProxyProperties() : [string]
//  updateProxyProperty(name, prop)
//  getProxySection() => List of properties for UI generation
// ----------------------------------------------------------------------------
let nextProxyId = 1;
const ROOT_GROUP_NAME = '__root__';

export function proxy(publicAPI, model) {
  // Proxies are keystores
  keystore(publicAPI, model);

  const parentDelete = publicAPI.delete;

  // getProxyId
  model.proxyId = `${nextProxyId++}`;

  // ui handling
  model.ui = JSON.parse(JSON.stringify(model.ui || [])); // deep copy
  get(publicAPI, model, ['proxyId', 'proxyGroup', 'proxyName']);
  setGet(publicAPI, model, ['proxyManager']);

  // group properties
  const propertyMap = {};
  const groupChildrenNames = {};

  function registerProperties(descriptionList, currentGroupName) {
    if (!groupChildrenNames[currentGroupName]) {
      groupChildrenNames[currentGroupName] = [];
    }
    const childrenNames = groupChildrenNames[currentGroupName];

    for (let i = 0; i < descriptionList.length; i++) {
      childrenNames.push(descriptionList[i].name);
      propertyMap[descriptionList[i].name] = descriptionList[i];
      if (descriptionList[i].children && descriptionList[i].children.length) {
        registerProperties(
          descriptionList[i].children,
          descriptionList[i].name
        );
      }
    }
  }
  registerProperties(model.ui, ROOT_GROUP_NAME);

  publicAPI.updateUI = (ui) => {
    model.ui = JSON.parse(JSON.stringify(ui || [])); // deep copy
    Object.keys(propertyMap).forEach((k) => delete propertyMap[k]);
    Object.keys(groupChildrenNames).forEach(
      (k) => delete groupChildrenNames[k]
    );
    registerProperties(model.ui, ROOT_GROUP_NAME);
    publicAPI.modified();
  };

  function listProxyProperties(gName = ROOT_GROUP_NAME) {
    return groupChildrenNames[gName];
  }

  publicAPI.updateProxyProperty = (propertyName, propUI) => {
    const prop = propertyMap[propertyName];
    if (prop) {
      Object.assign(prop, propUI);
    } else {
      propertyMap[propertyName] = Object.assign({}, propUI);
    }
  };

  publicAPI.activate = () => {
    if (model.proxyManager) {
      const setActiveMethod = `setActive${capitalize(
        publicAPI.getProxyGroup().slice(0, -1)
      )}`;
      if (model.proxyManager[setActiveMethod]) {
        model.proxyManager[setActiveMethod](publicAPI);
      }
    }
  };

  // property link
  model.propertyLinkSubscribers = {};
  publicAPI.registerPropertyLinkForGC = (otherLink, type) => {
    if (!(type in model.propertyLinkSubscribers)) {
      model.propertyLinkSubscribers[type] = [];
    }
    model.propertyLinkSubscribers[type].push(otherLink);
  };

  publicAPI.gcPropertyLinks = (type) => {
    const subscribers = model.propertyLinkSubscribers[type] || [];
    while (subscribers.length) {
      subscribers.pop().unbind(publicAPI);
    }
  };

  model.propertyLinkMap = {};
  publicAPI.getPropertyLink = (id, persistent = false) => {
    if (model.propertyLinkMap[id]) {
      return model.propertyLinkMap[id];
    }
    let value = null;
    const links = [];
    let count = 0;
    let updateInProgress = false;

    function update(source, force = false) {
      if (updateInProgress) {
        return null;
      }

      const needUpdate = [];
      let sourceLink = null;
      count = links.length;
      while (count--) {
        const link = links[count];
        if (link.instance === source) {
          sourceLink = link;
        } else {
          needUpdate.push(link);
        }
      }

      const newValue = sourceLink.instance[
        `get${capitalize(sourceLink.propertyName)}`
      ]();
      if (newValue !== value || force) {
        value = newValue;
        updateInProgress = true;
        while (needUpdate.length) {
          const linkToUpdate = needUpdate.pop();
          linkToUpdate.instance.set({
            [linkToUpdate.propertyName]: value,
          });
        }
        updateInProgress = false;
      }

      if (model.propertyLinkMap[id].persistent) {
        model.propertyLinkMap[id].value = newValue;
      }

      return newValue;
    }

    function unbind(instance, propertyName) {
      const indexToDelete = [];
      count = links.length;
      while (count--) {
        const link = links[count];
        if (
          link.instance === instance &&
          (link.propertyName === propertyName || propertyName === undefined)
        ) {
          link.subscription.unsubscribe();
          indexToDelete.push(count);
        }
      }
      while (indexToDelete.length) {
        links.splice(indexToDelete.pop(), 1);
      }
    }

    function bind(instance, propertyName, updateMe = false) {
      const subscription = instance.onModified(update);
      const other = links[0];
      links.push({
        instance,
        propertyName,
        subscription,
      });
      if (updateMe) {
        if (
          model.propertyLinkMap[id].persistent &&
          model.propertyLinkMap[id].value !== undefined
        ) {
          instance.set({
            [propertyName]: model.propertyLinkMap[id].value,
          });
        } else if (other) {
          update(other.instance, true);
        }
      }
      return {
        unsubscribe: () => unbind(instance, propertyName),
      };
    }

    function unsubscribe() {
      while (links.length) {
        links.pop().subscription.unsubscribe();
      }
    }

    const linkHandler = {
      bind,
      unbind,
      unsubscribe,
      persistent,
    };
    model.propertyLinkMap[id] = linkHandler;
    return linkHandler;
  };

  // extract values
  function getProperties(groupName = ROOT_GROUP_NAME) {
    const values = [];
    const id = model.proxyId;
    const propertyNames = listProxyProperties(groupName) || [];
    for (let i = 0; i < propertyNames.length; i++) {
      const name = propertyNames[i];
      const method = publicAPI[`get${capitalize(name)}`];
      const value = method ? method() : undefined;
      const prop = {
        id,
        name,
        value,
      };
      const children = getProperties(name);
      if (children.length) {
        prop.children = children;
      }
      values.push(prop);
    }
    return values;
  }

  publicAPI.listPropertyNames = () => getProperties().map((p) => p.name);

  publicAPI.getPropertyByName = (name) =>
    getProperties().find((p) => p.name === name);

  publicAPI.getPropertyDomainByName = (name) => propertyMap[name].domain;

  // ui section
  publicAPI.getProxySection = () => ({
    id: model.proxyId,
    name: model.proxyGroup,
    ui: model.ui,
    properties: getProperties(),
  });

  // free resources
  publicAPI.delete = () => {
    const list = Object.keys(model.propertyLinkMap);
    let count = list.length;
    while (count--) {
      model.propertyLinkMap[list[count]].unsubscribe();
    }
    Object.keys(model.propertyLinkSubscribers).forEach(
      publicAPI.gcPropertyLinks
    );
    parentDelete();
  };

  function registerLinks() {
    // Allow dynamic registration of links at the application level
    if (model.links) {
      for (let i = 0; i < model.links.length; i++) {
        const { link, property, persistent, updateOnBind, type } = model.links[
          i
        ];
        if (type === 'application') {
          const sLink = model.proxyManager.getPropertyLink(link, persistent);
          publicAPI.registerPropertyLinkForGC(sLink, 'application');
          sLink.bind(publicAPI, property, updateOnBind);
        }
      }
    }
  }
  setImmediate(registerLinks);
}

This class represents a reslice cursor that can be used to perform interactive thick slab MPR's through data. It consists of two cross sectional hairs. The hairs may have a hole in the center. These may be translated or rotated independent of each other in the view. The result is used to reslice the data along these cross sections. This allows the user to perform multi-planar thin or thick reformat of the data on an image view, rather than a 3D.




## getWidgetState(object)



Get the object that contains all the attributes used to update the representation and made computation for reslicing. The state contains:

- Six sub states which define the representation of all lines in all views. For example, the axis X is drawn in the Y and the Z view. Then, if we want to access to the attributes of the axis X, then we can call : state.getAxisXinY() and state.getAxisXinZ().

These sub states contain :
	* two points which define the lines
	* two rotation points which define the center of the rotation points
	* the color of the line
	* the name of the line (for example 'AxisXinY')
	* the name of the plane (X)

- Center: The center of the six lines

- activeLineState: Used in the behavior.js file in order to get the attribute of the selected line

- activeRotationPointName: Used in the behavior.js file in order to get the selected rotation point

- image: vtkImage used to place the reslice cursor

- activeViewName: Used in the behavior.js file in order to get the correct view attributes (X, Y, Z)

- sphereRadius: Manage the radius of the rotation points

- updateMethodName: Used in the behavior.js in order to know which actions is going to be applied (translation, axisTransltaion, rotation)

- {X, Y, Z}PlaneNormal: Contains the normal of the {X, Y, Z} plane (which is updated when a rotation is applied). It's used to compute the resliced image

- enableRotation: if false, then remove the rotation points and disable the line rotation

- enableTranslation: if false, disable the translation of the axis
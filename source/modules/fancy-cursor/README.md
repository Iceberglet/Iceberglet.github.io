Fancy Cursor
==============================================

While this cursor is not perfect, if you really want to use it, here are some tips:

* Cursor states:
currently there are two cursor states: `active` and `inactive`. (The `enlarged` state is removed since I deemed it ugly)

* **Props**
cursorColor: a js object with three values:
```javascript
{
  active: [0, 255, 200],
  inactive: [0, 255, 200]
}
```
each value is an array of RGB values for the color of cursor in two states

* Callbacks:
Use `cursorCallback` on elements which you wish to have a hover effect. Hovering triggers `active` state, while leaving will restore `inactive` state:
```jsx
<div {...cursorCallback} />
```

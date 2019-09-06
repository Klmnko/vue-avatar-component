# vue-avatar-component

The component use cropper.js:
https://fengyuanchen.github.io/cropperjs/

Avatar changes when you click on:
1. label in the header (inside of the block .imageUser)
2. label at the bottom of a circle with a picture (block. Avatar-preview under the heading “Your avatar”)

After adding the image it will be stored in the image parameter (in base64 format) inside the parent component app.js

If you write the way for an image in the image parameter, then it will be used as an avatar, and if you leave this parameter empty, then the user-solid.svg icon will be used as the avatar

The layout is adaptive up to 320px

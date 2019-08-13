Vue.component('user-avatar', {
    template: `
                <div id="imageUser" class="user">
                    <img :class="image ? '' : 'def'" :src="image ? image : 'src/img/user-solid.svg'" alt="img">
                    <label for="imgInp" class="user__avatar-btn"></label>
                    <input id="imgInp" type="file" class="d-none" ref="imageUploader" 
                        @click="resetImageUploader" 
                        @change="onFileChange(avatarInp, $event)"
                        >
                    <div v-bind:class="[showModal ? 'is-active' : '', 'modal']">
                        <div class="modal__background" @click="showModal = false"></div>
                        <div class="modal__content">
                            <div class="modal-box">
                                <div class="modal-box__title">Title</div>
                                <div class="modal-box__body">
                                    <img id="imageCrop" :src="avatarInp.image" alt="ava">
                                </div>
                                <div class="modal-box__btns">
                                    <button class="button button_blue" @click="rotateToLeft(cropper)">
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="#fff"
                                                  d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path>
                                        </svg>
                                        <span>rotate left</span>
                                    </button>
                                    <button class="button button_blue" @click="rotateToRight(cropper)">
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="#fff" transform="translate(512, 0) scale(-1, 1) "
                                                  d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path>
                                        </svg>
                                        <span>rotate right</span>
                                    </button>
                                    <button class="button button_green" @click="crop(cropper), showModal = false">
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="#fff"
                                                  d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path>
                                        </svg>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>
            
                        <button class="modal-close" @click="showModal = false"></button>
                    </div>
                </div>
    `,
    props: {
        image: String
    },
    data:() => {
        return {
            cropper: false,
            avatarInp: {
                image: false,
            },
            showModal: false
        }
    },
    methods: {
        resetImageUploader() {
            this.$refs.imageUploader.value = '';
        },
        onFileChange(avatarInp, e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(avatarInp, files[0]);

            this.showModal = true;
        },
        createImage(avatarInp, file) {
            let reader = new FileReader();

            reader.onload = (e) => {
                avatarInp.image = e.target.result;
            };
            reader.onloadend = () => {
                if (this.cropper !== false) {
                    this.cropper.destroy();
                }
                this.initCropper();
            };

            reader.readAsDataURL(file);
        },
        initCropper() {
            const image = document.getElementById('imageCrop');

            this.cropper = new Cropper(image, {
                viewMode: 2,
            });
        },
        rotateToRight(cropper) {
            cropper.rotate(90);
        },
        rotateToLeft(cropper) {
            cropper.rotate(-90);
        },
        crop(cropper) {
            let img = cropper.getCroppedCanvas({
                width: 1600,
                height: 900,
                minWidth: 256,
                minHeight: 256,
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            });

            this.image = img.toDataURL('image/png');
            this.$emit('change-image', this.image);
        }
    }
});
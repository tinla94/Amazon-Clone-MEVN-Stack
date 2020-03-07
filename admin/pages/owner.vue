<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Add a new product</h2>
                        <form >
                            <!-- Name Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Name</label>
                                <input 
                                    type="text" 
                                    class="a-input-text"
                                    style="width: 100%" 
                                    v-model="name"
                                    />
                            </div>
    
                            <!-- About Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">About</label>
                                <textarea 
                                    placeholder="Give an introduction about yourself" 
                                    style="width: 100%"
                                    v-model="about"
                                    ></textarea>
                            </div>
    
                            <!-- Owner Photo File -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Add Photo</label>
                                <div class="a-row a-spacing-top-medium">
                                    <label class="choosefile-button">
                                        <i class="fal fa-plus"></i>
                                        <input 
                                            type="file" 
                                            @change="onFileSelected"    
                                        />
                                        <p style="margin-top: -70px">{{ fileName }}</p>
                                    </label>
                                </div>
                            </div>
    
                            <!-- Add Product Button-->
                            <hr />
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text"
                                        @click="onAddOwner"
                                        >
                                            Add Owner
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <br />
                        <ul class="list-group-item">
                            <h4>Current owners</h4>
                            <hr />
                            <li 
                                v-for="owner in owners"
                                :key="owner._id"
                            >   
                                {{ owner.name}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        async asyncData({ $axios }) {
            try {
                let response = await $axios.$get('http://localhost:5000/api/owners');

                // return 
                return {
                    owners: response.owners
                }
            } catch (err) {
                console.log(err);
            }
        },

        data() {
            return {
                name: "",
                about: "",
                selectedFile: null,
                fileName: "",
            }
        },

        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                this.fileName = event.target.files[0].name;
            },

            async onAddOwner() {
                try {
                    let data = new FormData();
                    data.append("name", this.name);
                    data.append("about", this.about);
                    data.append("ownerPhoto", this.selectedFile, this.selectedFile.name);

                    let response = await this.$axios.$post(
                        'http://localhost:5000/api/owners', 
                    data); 

                    this.owners.push(data);
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>
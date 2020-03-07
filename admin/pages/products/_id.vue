<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-sm-3"></div>
                <div class="col-sm-6">
                    <div class="a-section">
                        <div class="a-spacing-top-medium"></div>
                        <h2 style="text-align: center">Update "{{ product.title }}"</h2>
                        <form >
                            <!-- Category Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Category</label>
                                <select 
                                    class="a-select-option"
                                    v-model="categoryID"    
                                >
                                        <option 
                                        v-for="category in categories"            
                                        :value="category._id"
                                        :key="category._id"
                                        >      
                                        {{ category.type }}
                                        </option>
                                    </select>
                            </div>
    
                            <!-- Owner Dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Owner</label>
                                <select 
                                    class="a-select-option"
                                    v-model="ownerID"
                                    >
                                        <option 
                                        v-for="owner in owners" 
                                        :value="owner._id"
                                        :key="owner._id"
                                        >      
                                        {{ owner.name }}
                                        </option>
                                    </select>
                            </div>
                            <!-- Title Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Title</label>
                                <input 
                                    type="text" 
                                    class="a-input-text"
                                    style="width: 100%" 
                                    v-model="title"
                                    :placeholder="product.title"
                                    />
                            </div>
    
                            <!-- Price Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Price</label>
                                <input 
                                    type="text" 
                                    class="a-input-text" 
                                    style="width: 100%" 
                                    v-model="price"
                                    :placeholder="product.price"
                                    />
                            </div>
    
                            <!-- Description Input -->
                            <div class="a-spacing-top-medium">
                                <label style="margin-bottom: 0px">Description</label>
                                <textarea 
                                    style="width: 100%"
                                    v-model="description"
                                    :placeholder="product.description"
                                    ></textarea>
                            </div>
    
                            <!-- Photo File -->
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
                                        @click="onUpdateProduct"
                                        >
                                            Update Product
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        async asyncData({ $axios, params }) {
            try {
                let categories = $axios.$get('http://localhost:5000/api/categories');
                let owners = $axios.$get('http://localhost:5000/api/owners');
                let product = $axios.$get(`http://localhost:5000/api/products/${params.id}`);

                // Promise.all will run 2 APIs together
                const [catResponse, ownerResponse, productResponse] = await Promise.all([
                    categories,
                    owners,
                    product
                ]);

                console.log(productResponse);

                // return 
                return {
                    categories: catResponse.categories,
                    owners: ownerResponse.owners,
                    product: productResponse.product
                }
            } catch (err) {
                console.log(err);
            }
        },

        data() {
            return {
                categoryID: null,
                ownerID: null,
                title: "",
                price: 0,
                description: "",
                selectedFile: null,
                fileName: "",
                stockQuantity: 1
            }
        },

        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
                this.fileName = event.target.files[0].name;
            },

            async onUpdateProduct() {
                let data = new FormData();
                data.append("title", this.title);
                data.append("description", this.description);
                data.append("price", this.price);
                data.append("stockQuantity", this.stockQuantity);
                data.append("ownerID", this.ownerID);
                data.append("categoryID", this.categoryID);
                data.append("photo", this.selectedFile, this.selectedFile.name);

                let result = await this.$axios.$put(
                    `http://localhost:5000/api/products/${this.$route.params.id}`, 
                    data
                );

                this.$router.push("/"); // GO BACK TO LISTING PAGE
            }
        }
    }
</script>
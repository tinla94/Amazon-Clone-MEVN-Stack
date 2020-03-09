<template>
    <div class="registerPage">
        <div class="container">
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <!-- Logo -->
                    <div class="text-center">
                        <nuxt-link to="/">
                            <img src="/img/logo-black.png" />
                        </nuxt-link>
                    </div>
                    <form class="mt-4">
                        <div class="a-box a-spacing-extra-large">
                            <div class="a-box-inner">
                                <h1 class="a-spacing-small">Sign In</h1>
                                <!-- Your email -->
                                <div class="a-row a-spacing-base">
                                    <label  
                                        for="ap_customer_name" 
                                        class="a-form-label">Email
                                    </label>
                                    <input 
                                        type="email" 
                                        id="ap_customer_name" 
                                        class="a-input-text form-control auth-autofocus auth-required-fieldauth-contact-verification-request-info"
                                        v-model="email"
                                        />
                                </div>
                                <!-- Your password -->
                                <div class="a-row a-spacing-base">
                                    <label  
                                        for="ap_customer_name" 
                                        class="a-form-label">Password
                                    </label>
                                    <input 
                                        type="password" 
                                        id="ap_customer_name" 
                                        class="a-input-text form-control auth-autofocus auth-required-fieldauth-contact-verification-request-info"
                                        v-model="password"
                                        />
                                    <div class="a-alert-container">
                                        <div class="a-alert-content">
                                            Pass word must be at least 6 characters
                                        </div>
                                    </div>
                                </div>
                                <!--- Create account bbutton -->
                                <div class="a-row a-spacing-extra-large mb-4">
                                    <span class="a-button-primary">
                                        <span class="a-button-inner">
                                            <span class="a-button-text" @click="onLogin">
                                                Continue
                                            </span>
                                        </span>
                                    </span>
                                </div>
                                <hr />
                                <div class="a-row">
                                    <b>
                                        Don't have an account?
                                        <nuxt-link to="/auth/signup" class="a-link-emphasis">
                                            Register
                                        </nuxt-link>
                                    </b>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: "auth",
        auth: "guest",
        layout: "none",
        data() {
            return {
                email: "",
                password: "",
            }
        },
        methods: {
            async onLogin() {     
                try {
                    this.$auth.loginWith("local", {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    });

                    // return to home page
                    this.$router.push("/")
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>
<template>
    <section class="container">
        <div>
            <h1 class="mt-2">Add country</h1>
            <div class="row">
                <div class="col-md-6 offset-md-3 mt-3">
                    <form autocomplete="off" @submit.stop.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="countryName">Name</label>
                            <b-form-input
                                id="countryName"
                                v-model="countryName"
                                type="text"
                                :autofocus="autofocus"
                                placeholder="Name of country"
                                required 
                            />
                        </div>
                        <div class="form-group">
                            <label for="nationality">Nationality</label>
                            <b-form-input
                                id="nationality"
                                v-model="nationality"
                                type="text"
                                :autofocus="autofocus"
                                placeholder="Nationality"
                                required 
                            />
                        </div>
                        <div class="form-group">
                            <label for="countryCode">Code</label>
                            <b-form-input
                                id="countryCode"
                                v-model="countryCode"
                                type="text"
                                :autofocus="autofocus"
                                placeholder="Coutntry code"
                                required 
                            />
                        </div>
                        <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default {
    data() {
        return {
            countryName: '',
            nationality: '',
            countryCode: '',
            loading: false,
            autofocus: true
        }
    },
    methods: {
    async handleSubmit() {
      this.loading = true
      try {
        await strapi.createEntry('countries', {
          name: this.countryName,
          nationality: this.nationality,
          code: this.countryCode
        })
        alert('Your entry has been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    },
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>



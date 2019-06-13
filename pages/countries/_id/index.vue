<template>
    <section class="container">
        <div>
            <h1 class="mt-2">Translations</h1>
            <div class="row">
                <div class="col-md-8">
                    <div class="card-columns">
                        <div v-for="countrytranslation in countrytranslations" :key="countrytranslation.id" class="card">
                            <div class="card-body">
                                <h5 class="card-title">{{ countrytranslation.name }}</h5>
                                <p class="card-text">{{ countrytranslation.nationality }}</p>
                                <p class="card-text">{{ countrytranslation.code }}</p>
                                <p class="card-text">{{ countrytranslation.locale }}</p>
                                <button @click="addToCart(countrytranslation)" class="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                        <button @click="createTranslation" class="btn btn-primary">Create translation</button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Cart</h5>
                            <p class="card-text">{{ numberOfItems }} items selected:</p>
                            <ul>
                                <li v-for="countryTranslation in selectedCountryTranslations" :key="countryTranslation.id" class="card-text mb-2">
                                Name: {{ countryTranslation.name }} ({{ countryTranslation.quantity }})
                                <button class="btn btn-sm btn-success" @click="addToCart(countryTranslation)">+</button>
                                <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(countryTranslation)">-</button>
                                </li>
                            </ul>
                            <p v-if="!selectedCountryTranslations.length">Please select some items.</p>
                            <button :disabled="!selectedCountryTranslations.length" class="btn btn-primary">Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
import { mapMutations } from 'vuex'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)

export default {
    computed: {
        id() {
            return this.$route.params.id
        },
        countrytranslations() {
            return this.$store.getters['countrytranslations/list']
        },
        selectedCountryTranslations() {
            return this.$store.getters['cart/items']
        },
        numberOfItems() {
            return this.$store.getters['cart/numberOfItems']
        }
    },
    async fetch({ store, params }) {
        store.commit('countrytranslations/emptyList')
        const response = await strapi.request('post', '/graphql', {
            data: {
                query: `query {
                    country(id: "${params.id}") {
                        id
                        name
                        countrytranslations {
                            id
                            name
                            locale
                            code
                            nationality
                        }
                    }
                }`
            }
        })
        response.data.country.countrytranslations.forEach(countrytranslation => {
            store.commit('countrytranslations/add', {
                id: countrytranslation.id,
                ...countrytranslation
            })
        })
    },
    methods: {
        ...mapMutations({
            addToCart: 'cart/add',
            removeFromCart: 'cart/remove',
            emptyCart: 'cart/emptyList'
        })
    }
}
</script>

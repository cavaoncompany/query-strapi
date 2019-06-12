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
                                <button class="btn btn-primary">Add to card</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Card</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)

export default {
    computed: {
        id() {
            return this.$route.params.id
        },
        countrytranslations() {
            return this.$store.getters['countrytranslations/list']
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
    }
}
</script>

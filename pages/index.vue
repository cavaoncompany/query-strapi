<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group mt-3">
          <input v-model="query" type="text" class="form-control" placeholder="Search...">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <ul class="card-columns list-unstyled">
          <li v-for="country in filteredList" :key="country.id" class="card">
            <div class="card-body">
              <h5 class="card-title">{{ country.id }} {{ country.name }}</h5>
              <p class="card-text">Country code: {{ country.code || 'No code provided' }}.</p>
              <p class="card-text">Nationality: {{ country.nationality || 'No nationality provided' }}</p>
              <router-link :to="{ name: 'countries-id', params: { id: country.id }}" tag="a" class="btn btn-primary">
                See translations
              </router-link>
            </div>
          </li>
          <p v-if="!filteredList.length">No results :(</p>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)

export default {
  components: {},
  data() {
    return {
      query: ''
    }
  },
  computed: {
    filteredList() {
      return this.countries.filter(country => {
        return country.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
    countries() {
      return this.$store.getters['countries/list']
    }
  },
  async fetch({store}) {
    store.commit('countries/emptyList')
    const response = await strapi.request('post', '/graphql', {
      data: {
        query: `query {
          countries {
            id
            name
            nationality
            code
          }
        }`
      }
    })
    response.data.countries.forEach(country => {
      store.commit('countries/add', {
        id: country.id,
        ...country
      })
    })
  }
}
</script>

<style>
</style>


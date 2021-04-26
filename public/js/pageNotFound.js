var PageNotFound = Vue.component("PageNotFound", {
  template: `<div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">Page introuvable (404).</div>
            <div class="grey--text lighten-5">
            La page à laquelle vous essayez d'accéder n'a jamais existé dans cette réalité,
            ou a migré vers un univers parallèle.
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</div>`,
});

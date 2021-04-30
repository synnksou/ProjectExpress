var Teams = Vue.component("Teams", {
  template: `<div class="team-builder">
    <div class="text"> Ici vous pouvez gerer votre gestion d'équipe, vous pouvez faire du team building pokemon, vous ne pouvez n'ajouter qu'une seule equipe</div>
    <button type="button" v-if="!teams.length" class="btn btn-success" ><router-link class="nav-link text-white" to="/builder">Ajouter une equipe</router-link></button>
    <div>
    <div class="container-lg">
      <div class="text" v-if="teams.length <= 0">
        <a>{{messageEmptyTeam}}</a>
      </div>
      <div v-if="teams.length > 0 ">
        <button type="button" class="btn btn-danger" v-on:click="removeTeam">Supprimer votre equipe</button>
      </div>
    </div>
    <ul class="picked" v-for="pokemon in teams" :key="pokemon">
            <li class="picked">
                <figure class="unknown">
                <img class="img-pokemon picked" :src="pokemon.path"></img>
                </figure>
                <div class="info">
                    <span class="name">{{pokemon.name}}</span>
                    <div v-for="type in pokemon.type.type" :key="type">
                    <span class="pkm-type" v-bind:class="[type]" >{{type}}</span>
                    </div>
                </div>
        </li></ul>
    </div>
    <div class="grid-col span-lg-8 resp-scroll">
    <table class="type-table">
    <thead>
    <tr>
    <th class="cell-atkdef">DEFENSE&nbsp;→<br>ATTACK&nbsp;↴</th>
    <th><a class="type-icon pkm-type normal type-cell type-abbr" title="Normal">Nor</a></th>
    <th><a class="type-icon pkm-type fire type-cell type-abbr" title="Fire">Fir</a></th>
    <th><a class="type-icon pkm-type water type-cell type-abbr" title="Water">Wat</a></th>
    <th><a class="type-icon pkm-type electrik type-cell type-abbr" title="Electric">Ele</a></th>
    <th><a class="type-icon pkm-type grass type-cell type-abbr" title="Grass">Gra</a></th>
    <th><a class="type-icon pkm-type ice type-cell type-abbr" title="Ice">Ice</a></th>
    <th><a class="type-icon pkm-type fighting type-cell type-abbr" title="Fighting">Fig</a></th>
    <th><a class="type-icon pkm-type poison type-cell type-abbr" title="Poison">Poi</a></th>
    <th><a class="type-icon pkm-type ground type-cell type-abbr" title="Ground">Gro</a></th>
    <th><a class="type-icon pkm-type flying type-cell type-abbr" title="Flying">Fly</a></th>
    <th><a class="type-icon pkm-type psychic type-cell type-abbr" title="Psychic">Psy</a></th>
    <th><a class="type-icon pkm-type bug type-cell type-abbr" title="Bug">Bug</a></th>
    <th><a class="type-icon pkm-type rock type-cell type-abbr" title="Rock">Roc</a></th>
    <th><a class="type-icon pkm-type ghost type-cell type-abbr" title="Ghost">Gho</a></th>
    <th><a class="type-icon pkm-type dragon type-cell type-abbr" title="Dragon">Dra</a></th>
    <th><a class="type-icon pkm-type dark type-cell type-abbr" title="Dark">Dar</a></th>
    <th><a class="type-icon pkm-type steel type-cell type-abbr" title="Steel">Ste</a></th>
    <th><a class="type-icon pkm-type fairy type-cell type-abbr" title="Fairy">Fai</a></th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <th><a class="type-icon pkm-type normal type-cell">Normal</a></th>
    <td title="Normal → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Rock = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Normal → Ghost = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Normal → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Normal → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Normal → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type fire type-cell" >Fire</a></th>
    <td title="Fire → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fire → Water = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fire → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Grass = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fire → Ice = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fire → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Bug = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fire → Rock = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fire → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Dragon = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fire → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fire → Steel = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fire → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type water type-cell" >Water</a></th>
    <td title="Water → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Fire = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Water → Water = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Water → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Grass = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Water → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Ground = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Water → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Rock = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Water → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Dragon = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Water → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Steel = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Water → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type electrik type-cell" >Electric</a></th>
    <td title="Electric → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Water = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Electric → Electric = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Electric → Grass = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Electric → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Ground = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Electric → Flying = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Electric → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Dragon = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Electric → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Steel = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Electric → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type grass type-cell">Grass</a></th>
    <td title="Grass → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Water = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Grass → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Grass = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Poison = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Ground = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Grass → Flying = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Bug = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Rock = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Grass → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Dragon = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Grass → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Grass → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type ice type-cell">Ice</a></th>
    <td title="Ice → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ice → Water = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ice → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Grass = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ice → Ice = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ice → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Ground = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ice → Flying = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ice → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Dragon = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ice → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ice → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ice → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type fighting type-cell">Fighting</a></th>
    <td title="Fighting → Normal = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fighting → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Ice = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fighting → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Poison = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fighting → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Flying = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fighting → Psychic = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fighting → Bug = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fighting → Rock = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fighting → Ghost = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Fighting → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fighting → Dark = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fighting → Steel = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fighting → Fairy = not very effective" class="type-fx-cell type-fx-50">½</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type poison type-cell">Poison</a></th>
    <td title="Poison → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Grass = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Poison → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Poison = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Poison → Ground = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Poison → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Rock = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Poison → Ghost = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Poison → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Poison → Steel = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Poison → Fairy = super-effective" class="type-fx-cell type-fx-200">2</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type ground type-cell">Ground</a></th>
    <td title="Ground → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Fire = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ground → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Electric = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ground → Grass = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ground → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Poison = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ground → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Flying = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Ground → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Bug = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ground → Rock = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ground → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ground → Steel = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ground → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type flying type-cell">Flying</a></th>
    <td title="Flying → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Electric = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Flying → Grass = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Flying → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Fighting = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Flying → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Bug = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Flying → Rock = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Flying → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Flying → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Flying → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type psychic type-cell">Psychic</a></th>
    <td title="Psychic → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Fighting = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Psychic → Poison = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Psychic → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Psychic = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Psychic → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Psychic → Dark = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Psychic → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Psychic → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type bug type-cell">Bug</a></th>
    <td title="Bug → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Grass = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Bug → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Fighting = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Poison = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Flying = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Psychic = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Bug → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Ghost = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Bug → Dark = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Bug → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Bug → Fairy = not very effective" class="type-fx-cell type-fx-50">½</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type rock type-cell">Rock</a></th>
    <td title="Rock → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Fire = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Rock → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Ice = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Rock → Fighting = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Rock → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Ground = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Rock → Flying = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Rock → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Bug = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Rock → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Rock → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Rock → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type ghost type-cell">Ghost</a></th>
    <td title="Ghost → Normal = no effect" class="type-fx-cell type-fx-0">0</td> <td title="Ghost → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Psychic = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ghost → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Ghost = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Ghost → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Dark = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Ghost → Steel = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Ghost → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    <tr>
    <th><a class="type-icon pkm-type dragon type-cell">Dragon</a></th>
    <td title="Dragon → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Dragon = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Dragon → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dragon → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Dragon → Fairy = no effect" class="type-fx-cell type-fx-0">0</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type dark type-cell">Dark</a></th>
    <td title="Dark → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Fire = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Fighting = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Dark → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Psychic = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Dark → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Ghost = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Dark → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Dark = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Dark → Steel = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Dark → Fairy = not very effective" class="type-fx-cell type-fx-50">½</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type steel type-cell">Steel</a></th>
    <td title="Steel → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Steel → Water = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Steel → Electric = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Steel → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Ice = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Steel → Fighting = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Poison = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Rock = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Steel → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Dragon = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Dark = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Steel → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Steel → Fairy = super-effective" class="type-fx-cell type-fx-200">2</td> </tr>
    <tr>
    <th><a class="type-icon pkm-type fairy type-cell">Fairy</a></th>
    <td title="Fairy → Normal = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Fire = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fairy → Water = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Electric = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Grass = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Ice = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Fighting = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fairy → Poison = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fairy → Ground = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Flying = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Psychic = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Bug = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Rock = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Ghost = normal effectiveness" class="type-fx-cell type-fx-100"></td> <td title="Fairy → Dragon = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fairy → Dark = super-effective" class="type-fx-cell type-fx-200">2</td> <td title="Fairy → Steel = not very effective" class="type-fx-cell type-fx-50">½</td> <td title="Fairy → Fairy = normal effectiveness" class="type-fx-cell type-fx-100"></td> </tr>
    </tbody>
    </table>
    </div>
</div>`,

  data() {
    return {
      teams: [],
      messageEmptyTeam: " Vous n'avez pas d'équipe, let's go en crée une ! :)",
      messageSucces: "Vous avez fait une action sur votre equipe avec succes",
    };
  },
  methods: {
    removeTeam() {
      const url = "api/teams/delete_teams?";
      swal({
        title: "Etes vous sur ?",
        text: "Vous les vous vraiment supprimer votre équipe",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user-token")}`,
              },
              params: {
                userId: this.$store.state.user.id,
              },
            })
            .catch((err) => {
              console.log(err);
            });
          swal("Votre equipe a été supprimer !", {
            icon: "success",
          }).then(() => {
            this.$router.go(0);
          });
        } else {
          swal("Votre equipe est en sécurité !");
        }
      });
    },
  },
  mounted() {
    const url = "api/teams/get_teams?";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
        params: {
          id: this.$store.state.user.id,
        },
      })
      .then((response) => {
        this.teams = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
});

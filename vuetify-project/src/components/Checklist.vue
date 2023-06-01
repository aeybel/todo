<template>
  <v-toolbar color="purple">
    <v-btn icon="mdi-menu"></v-btn>

    <v-toolbar-title>My Checklist 1</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon="mdi-magnify"></v-btn>
  </v-toolbar>

  <v-card>
    <v-form @submit.prevent="addTodo">
      <v-text-field v-model="newTodo" label="New Todo"></v-text-field>
      <template v-slot:append>
        <v-list-item-action>
          <v-btn icon="$add" variant="text"></v-btn>
        </v-list-item-action>
      </template>
    </v-form>

    <v-list>
      <v-list-subheader>Todos</v-list-subheader>
      <v-list-item v-for="todo in todos" :key="todo.id">
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox hide-details v-model="todo.completed" @click="() => toggleTodo(todo)"></v-checkbox>
              </v-list-item-action>
            </template>
            <v-list-item-content>
              <v-hover v-slot:default="{ isHovering }">
                <v-list-item-title :color="isHovering ? 'primary' : undefined">{{ todo.description }}</v-list-item-title>
              </v-hover>
            </v-list-item-content>
            <template v-slot:append>
              <v-list-item-action>
                <v-btn icon="$close" variant="text" @click="() => deleteTodo(todo)"></v-btn>
              </v-list-item-action>
            </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      api: "http://localhost:3001/"
    }
  },
  methods: {
    addTodo() {
      axios.post(this.api, {
        description: this.newTodo,
        completed: false
      }).then(response => this.todos.push(response.data))
      this.newTodo = ""
    },
    deleteTodo(todo) {
      axios.delete(this.api + "id/" + todo.id)
        .then(this.todos = this.todos.filter((t) => t !== todo))
    },
    toggleTodo(todo) {
      axios.patch(this.api + "id/"+ todo.id, {
        completed: !todo.completed
      });
    }
  },
  mounted () {
    axios
      .get('http://localhost:3001/')
      .then(response => (this.todos = response.data))
  }
}
</script>

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-title>
          <span class="headline">Clientes</span>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            fab
            large
            @click="dialog = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="customers"
            :items-per-page="5"
            class="elevation-1"
        >
          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click=""
              color="yellow darken-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                class="ml-3"
              small
              @click="deleteCustomer(item.id)"
                color="red"
            >
              mdi-delete
            </v-icon>

          </template>
        </v-data-table>
      </v-card>
    </v-container>


    <v-dialog
        transition="dialog-bottom-transition"
        max-width="800"
        v-model="dialog"
    >
      <v-card>
        <v-toolbar flat color="white">
          <v-toolbar-title>Nuevo Cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="name"
                  label="Nombre"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="phone"
                  label="Teléfono"
                  required
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                    v-model="city"
                    label="Ciudad"
                    required
                    outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  v-model="address"
                  label="Dirección"
                  required
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="save" color="primary" >Guardar</v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>


  </div>

</template>

<script>
import {db} from "@/plugins/db";
import {MESSAGE} from "@/plugins/alert";

export default {
  name: "Customer",
  data:() => ({
    //forms
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',



    dialog: false,
    customers: [],
    headers: [
      {
        text: 'Nombre',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Ciudad', value: 'city' },
      { text: 'Direccion', value: 'address' },
      { text: 'Telefono', value: 'phone' },
      { text: 'Email', value: 'email' },
      { text: 'Acciones', value: 'action' }
    ]
  }),
  methods:{
    save(){
      db.collection('customers').add({
        name: this.name,
        email: this.email,
        phone: this.phone,
        city: this.city,
        address: this.address
      }).then(() => {
        this.dialog = false;
        this.name = '';
        this.email = '';
        this.phone = '';
        this.city = '';
        this.address = '';
        MESSAGE('Exito', 'Cliente guardado con exito', 'success');
      }).catch(() => {
        MESSAGE('Error', 'No se pudo guardar el cliente', 'error');
      })
    },
    deleteCustomer(id){
      db.collection('customers').doc(id).delete().then(() => {
        MESSAGE('Exito', 'Cliente eliminado con exito', 'success');
      }).catch(() => {
        MESSAGE('Error', 'No se pudo eliminar el cliente', 'error');
      })
    }
  },
  firestore:{
    customers: db.collection('customers')
  }

}
</script>

<style scoped>

</style>
<template>
  <div :class="$style.container">
    <div :class="$style.window">
      <ui-textarea placeholder="Description..." style="margin-bottom: 10px" v-model="description" />
      <ui-input placeholder="Tags..." style="margin-bottom: 10px" v-model="tags" />
      <ui-input placeholder="Created..." style="margin-bottom: 10px" v-model="created" />

      <div style="display: flex">
        <ui-button @click="$emit('close')" text="Cancel" style="margin-right: 5px" />
        <ui-button @click="submit()" text="Save" icon="plus" style="margin-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Moment from 'moment';

export default defineComponent({
  props: {
    id: String,
    date: Object,
  },
  components: {},
  async mounted() {
    const d = await RestApi.knowledge.get(this.id + '');
    this.tags = d.tags.join(', ');
    this.description = d.description + '';
    this.created = Moment(d.created).format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    async submit() {
      await RestApi.knowledge.update({
        id: this.id + '',
        tags: this.tags.split(',').map((x: string) => x.trim()),
        description: this.description,
        created: this.created,
      });
      this.$emit('close');
    },
  },
  data() {
    return {
      tags: '',
      description: '',
      created: '',
    };
  },
});
</script>

<style lang="scss" module>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .window {
    min-width: 320px;
    background: #444444;
    border-radius: 4px;
    padding: 25px;
    color: #fefefe;
    box-shadow: 0px 1px 6px 2px #00000055;

    textarea {
      width: 480px;
      height: 320px;
    }
  }
}
</style>

<template>
  <div :class="$style.list">
    <Button
      text="Add new"
      icon="add"
      @click="isAdd = true"
      style="width: 100%; margin-bottom: 10px"
    />
    <div v-for="note in list" :key="note.id" :class="$style.block">
      <div :class="$style.header">
        <div :class="$style.left">
          {{ $root.moment(note.deadline).format('DD MMM YYYY HH:mm') }}
        </div>
        <div :class="$style.left2">
          {{ note.priority }}
        </div>
        <img
          @click="(editId = note.id), (isEdit = true)"
          class="clickable"
          src="../../asset/pencil.svg"
          alt=""
          style="margin-left: auto"
        />
        <img @click="remove(note.id)" class="clickable" src="../../asset/trash.svg" alt="" />
        <div :class="$style.right">
          {{ $root.moment(note.created).format('DD MMM YYYY HH:mm') }}
        </div>
      </div>
      <div :class="$style.body" v-html="note.description.replace(/\n/g, '<br>')"></div>
    </div>

    <Add v-if="isAdd" @close="(isAdd = false), refresh()" />
    <Edit :id="editId" v-if="isEdit" @close="(isEdit = false), refresh()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Button from '../Button.vue';
import Add from './Add.vue';
import Edit from './Edit.vue';

export default defineComponent({
  props: {},
  components: { Button, Add, Edit },
  async mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      this.list = await RestApi.todo.getList();
    },
    async remove(id: string) {
      if (confirm('Are you sure?')) {
        await RestApi.todo.delete(id);
      }
      this.refresh();
    },
  },
  data: () => {
    return {
      isAdd: false,
      isEdit: false,
      editId: '',
      list: [],
    };
  },
});
</script>

<style lang="scss" module>
.list {
  .block {
    font-size: 15px;
    margin-bottom: 15px;

    .header {
      display: flex;

      .left,
      .right,
      .left2 {
        padding: 10px 15px;
        background: #0000004d;
        border-radius: 6px 6px 0 0;
        color: #979797;
        font-weight: bold;

        span {
          color: #979797;
          font-style: italic;
          font-weight: 300;
        }
      }

      .left {
        color: #cfda1e;
      }

      .left2 {
        margin-left: 10px;
        color: #1edaab;
        font-weight: bold;
      }

      img {
        margin-left: 15px;
      }

      .right {
        margin-left: 15px;
      }
    }

    .body {
      padding: 10px 15px;
      background: #0000004d;
      border-radius: 0 0 6px 6px;
      color: #979797;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

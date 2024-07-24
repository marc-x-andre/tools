<template>
  <n-h1>JIRA report to CSV</n-h1>
  <n-form
    class="converter-form"
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-grid :cols="12" :x-gap="24" item-responsive>
      <!-- Row 2 -->
      <n-form-item-gi span="12 800:4" label="JSON report" path="jsonReport">
        <JsonEditor
          :modelValue="formValue.jsonReport"
          @update:modelValue="jsonToCSV"
        />
      </n-form-item-gi>
      <n-form-item-gi span="12 800:8" label="CSV" path="csvReport">
        <n-data-table
          ref="tableRef"
          :columns="columns"
          :data="data"
          :pagination="pagination"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup>
import { ref } from "vue";
import JsonEditor from "./JsonEditor.vue";
import { compress } from "compress-json";
import json from "./wip.json";

// Table

const columns = [
  {
    title: "Date",
    key: "date",
    sorter: "default",
  },
  {
    title: "Issue",
    key: "issue",
    sorter: "default",
  },
  {
    title: "Event Detail",
    key: "detail",
  },
  {
    title: "Spent Inc",
    key: "spentInc",
  },
  {
    title: "Spent Dec",
    key: "test1",
  },
  {
    title: "Remaining Inc",
    key: "test2",
  },
  {
    title: "Remaining Dec",
    key: "test2",
  },
];

const getEventDetail = (change) => {
  if (change.added) {
    return "Issue added to sprint";
  } else if (change.column && change.column.done) {
    return "Issue completed";
  } else if (change.column && change.column.notDone) {
    return `Issue status change to ${change.column.newStatus}`;
  } else if (change.timeC) {
    let detail = "";
    const timeC = change.timeC;
    if (timeC.changeDate) {
      detail += "❓❗";
    }
    if (timeC.timeSpent) {
      console.log(timeC.oldEstimate);
      detail += `${timeC.timeSpent / 3600}h logged;`;
    }
    if (timeC.oldEstimate - timeC.newEstimate !== 0) {
      detail += `RTE❗`;
    }
    return detail;
  } else {
    console.log(change);
    return "❓";
  }
};

const processEvent = (date, change) => {
  return {
    date,
    change,
    issue: change.key,
    spentInc: change?.timeC?.timeSpent
      ? change.timeC.timeSpent / 3600
      : undefined,
    detail: getEventDetail(change),
  };
};

const test = (json) => {
  return Object.keys(json.changes).flatMap((date) => {
    const changesAt = json.changes[date]; // Array of changes
    return changesAt.map((change) => processEvent(date, change));
  });
};

const data = test(json);

// Form

const jsonToCSV = (v) => {
  formValue.value.jsonReport = v;
  formValue.value.csvReport = JSON.stringify(compress(JSON.parse(v)));
};

const formRef = ref(null);
const formValue = ref({
  jsonReport: json,
  data: "",
});

const rules = {
  jsonReport: {
    trigger: ["input"],
    validator: (rule, value) => {
      return value !== "";
    },
  },
};
</script>

<style lang="sass">
.converter-form
  .n-input .n-input__input, .n-input .n-input__textarea
    height: var(--input-height)
</style>

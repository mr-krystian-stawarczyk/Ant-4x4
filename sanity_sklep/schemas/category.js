export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'string'}], // Tutaj można również użyć "subcategoryReference", jeśli chcesz zrobić odniesienia do innych dokumentów.
    },
  ],
}

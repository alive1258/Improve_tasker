export const initialTask = [
  {
    id: crypto.randomUUID(),
    title: 'Integration API',
    description:
      'Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.',
    tags: ['PHP', 'Python', 'NextJs'],
    priority: 'High',
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'API Data Synchronization with Python',
    description:
      'Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange',
    tags: ['Java', 'React', 'Data'],
    priority: 'High',
    isFavorite: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Data Handling',
    description:
      'Integrate a web API with a third-party database using secure methods, focusing on seamless data exchange and data integrity.',
    tags: ['Security', 'AWS', 'JWT'],
    priority: 'High',
    isFavorite: false,
  },
]

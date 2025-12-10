# My Frank - Vue 3 Dashboard Application

A modern, responsive dashboard application built with Vue 3, TypeScript, Tailwind CSS v4, and Pinia state management.

## 🚀 Tech Stack

- **Framework:** Vue 3.5.24 (Composition API)
- **Build Tool:** Vite (Rolldown Vite 7.2.5)
- **Styling:** Tailwind CSS v4.1.17
- **State Management:** Pinia 3.0.4
- **HTTP Client:** Axios 1.13.2
- **Router:** Vue Router 4.6.3
- **TypeScript:** 5.9.3
- **UI Components:** Custom shadcn-vue based components (reka-ui)
- **Table Library:** @tanstack/vue-table
- **Drag & Drop:** dnd-kit-vue
- **Icons:** @hugeicons, @tabler/icons-vue, lucide-vue-next

## 📋 Features

- ✅ **Reusable DataTable Component** - Drag-and-drop, pagination, row selection, custom actions
- ✅ **Responsive Design** - Mobile-first approach with adaptive layouts
- ✅ **State Management** - Pinia stores for products and statistics
- ✅ **Service Architecture** - Clean separation with Axios service layer
- ✅ **Fake API** - JSON Server for development and testing
- ✅ **TypeScript** - Full type safety across the application
- ✅ **Modern UI Components** - Sidebar, header, cards, tables, forms

## 📦 Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd my-frank
```

2. **Install dependencies:**

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

You need to run **two terminals** simultaneously:

**Terminal 1 - Start Fake API Server:**

```bash
npm run api
```

This starts the JSON Server on `http://localhost:3000`

**Terminal 2 - Start Development Server:**

```bash
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Access Points

- **Application:** http://localhost:5173
- **Fake API:** http://localhost:3000
- **API Endpoints:**
  - `GET /products` - Get all products
  - `GET /products/:id` - Get product by ID
  - `POST /products` - Create new product
  - `PUT /products/:id` - Update product
  - `DELETE /products/:id` - Delete product
  - `GET /stats` - Get statistics

## 📁 Project Structure

```
my-frank/
├── db.json                    # Fake API database
├── src/
│   ├── components/            # Reusable components
│   │   ├── data-table/       # DataTable component
│   │   ├── header/           # Header component
│   │   ├── sidebar/          # Sidebar component
│   │   └── ui/               # UI components (shadcn-vue based)
│   ├── layouts/              # Layout components
│   ├── lib/                  # Utility functions
│   ├── pages/                # Page components
│   │   ├── home/             # Dashboard pages
│   │   ├── analysis/
│   │   ├── billings/
│   │   ├── campaigns/
│   │   ├── network/
│   │   ├── review/
│   │   ├── rewards/
│   │   ├── settings/
│   │   └── team/
│   ├── router/               # Vue Router configuration
│   ├── services/             # API service layer
│   │   ├── api.ts            # Axios instance with interceptors
│   │   └── productService.ts # Product API methods
│   ├── stores/               # Pinia stores
│   │   ├── productStore.ts   # Product state management
│   │   └── statsStore.ts     # Statistics state management
│   ├── styles/               # Global styles
│   ├── App.vue               # Root component
│   └── main.ts               # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🏗️ Architecture

### Service Layer Pattern

```typescript
// API Client (src/services/api.ts)
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});
```

### Pinia Store Pattern

```typescript
// Product Store (src/stores/productStore.ts)
export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);

  async function fetchProducts() {
    loading.value = true;
    try {
      products.value = await productService.getAllProducts();
    } finally {
      loading.value = false;
    }
  }

  return { products, loading, fetchProducts };
});
```

### Component Usage

```vue
<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();

onMounted(() => {
  productStore.fetchProducts();
});

const data = computed(() => productStore.products);
</script>
```

## 🎨 Key Components

### DataTable Component

Fully featured data table with:

- Dynamic column configuration
- Drag-and-drop row reordering
- Row selection with checkboxes
- Custom action buttons
- Pagination controls
- Column visibility toggling
- Responsive design

**Usage:**

```vue
<DataTable
  :data="products"
  :columns="tableColumns"
  :is_dragable="true"
  :is_checked="true"
  :is_actions="true"
  :is_customize_columns="true"
/>
```

### Combobox with Icon-Only Mode

Dropdown selector with mobile optimization:

```vue
<Combobox v-model="selectedValue" :options="options" :icon-only="true" />
```

## 🔧 Configuration

### Tailwind CSS v4

Configuration in `vite.config.ts`:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📝 API Data Structure

### Product Interface

```typescript
interface Product {
  id: number;
  name: string;
  address: string;
  rating: number;
  totalReview: number;
  status: {
    value: number;
    type: 'neutral' | 'positive' | 'negative';
  };
}
```

### Stats Interface

```typescript
interface Stats {
  id: number;
  title: string;
  value: string;
  icon: string;
}
```

## 🐛 Troubleshooting

**Port Already in Use:**

```bash
# Change port in package.json
"api": "json-server --watch db.json --port 3001"
```

**Module Not Found:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**

```bash
# Type check without emitting
npm run build
```

## 📄 License

This project is private and proprietary.

## 👥 Author

Created as part of a Frontend Developer technical assessment.

## 📞 Support

For issues or questions, please contact the development team.

import { 
  LibraryBooks as ListIcon, 
  NoteAdd as AddIcon 
} from '@material-ui/icons'
import DocumentsPage from '@/pages/DocumentsPage'
import UploadPage from '@/pages/UploadPage'

const routes = [
  {
    path: '/',
    title: 'Documents',
    icon: ListIcon,
    component: DocumentsPage
  },
  {
    path: '/upload',
    title: 'Upload',
    icon: AddIcon,
    component: UploadPage
  }
]

export default routes

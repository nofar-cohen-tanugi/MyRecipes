import { HomePage } from './component/Home/HomePage';
import '../public/style/index.scss';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

function App() {
  return (
    <div className='flex justify-content-center w-full'>
      <HomePage />
    </div>
  );
}

export default App;

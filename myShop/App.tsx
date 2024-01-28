import { NavigationContainer } from '@react-navigation/native';
import ProductStackNav from './app/navigation/ProductsStack';


export default function App() {
  return (
    <NavigationContainer>
      <ProductStackNav />
    </NavigationContainer>
  );
}



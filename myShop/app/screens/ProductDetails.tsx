import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductDetailsPageProps } from '../navigation/ProductsStack'
import { Product, fetchProductDetails } from '../api/api';
import useCartStore from '../state/cartStore';
import { Ionicons } from '@expo/vector-icons'

const ProductDetails = ({ route }: ProductDetailsPageProps) => {

    const { id } = route.params;
    const [product, setProduct] = useState<Product | null>()
    const { products,  addProduct, reduceProduct } = useCartStore((state) => ({
        products: state.products,
        addProduct: state.addProduct,
        reduceProduct: state.reduceProduct
    }))

    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("UPDATED PRODUCTS");
        
        updateProductQuantity()
    }, [products])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
              const productData = await fetchProductDetails(id);
              console.log('~ file: ProductDetails.tsx:14 ~ fetchProduct ~ productData:', productData)
              setProduct(productData);
            } catch (error) {
              console.error('Error fetching product details:', error);
            }
          };

          fetchProduct()
    }, [])

    const updateProductQuantity = () => {
        const result = products.filter((product) => product.id === id);
        if (result.length > 0) {
          setCount(result[0].quantity);
        } else {
          setCount(0);
        }
      };


  return (
    <SafeAreaView style={styles.container}>
        { product && (
            <>
                <Image source={{ uri: product.product_image }} style={styles.productImage} />
                <Text style={styles.productName}> {product.product_name} </Text>
                <Text style={styles.productCategory} > {product.product_category} </Text>
                <Text style={styles.productDescription}> {product.product_description} </Text>
                <Text style={styles.productPrice}> Price: ${product.product_price} </Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => reduceProduct(product)}>
                        <Ionicons name='remove' size={24} color={'#1FE687'} />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>
                        {count}
                    </Text>
                    
                    <TouchableOpacity style={styles.button} onPress={() => addProduct(product)}>
                        <Ionicons name='add' size={24} color={'#1FE687'} />
                    </TouchableOpacity>
                </View>
            </>
        ) }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    productImage: {
        height: 300,
        resizeMode: 'contain',
        borderRadius: 8,

    },
    productName: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold'
    },
    productPrice: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    productCategory: {
        marginTop: 5,
        fontSize: 16,
        color: '#666'
    },
    productDescription: {
        marginTop: 10,
        fontSize: 16,
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        borderColor: '#1fe687',
        borderWidth: 2,
    },
    quantity: {
        fontSize: 20,
        width: 50,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default ProductDetails

import React, { useEffect, useState } from 'react';
import { Alert, } from 'react-native';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import axios from 'axios';

export default function App() {
  const [fontsLoaded, setFontsLoaded]         = useState(false);
  const [products, setProducts]               = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible]       = useState(false);

 
  useEffect(() => {
    Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    })
    .then(() => setFontsLoaded(true))
    .catch(console.warn);
  }, []);

  
  useEffect(() => {
    axios
      .get('http://192.168.1.126:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('API HATASI:', err));
  }, []);

  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />


     <View style={styles.header}>
  {/* Sepet İkonu (absolute sola yerleşecek) */}
  <TouchableOpacity 
    style={styles.cartButton} 
    onPress={() => {/* şimdilik boş */}}
  >
    <MaterialIcons name="shopping-cart" size={28} color="#212121" />
  </TouchableOpacity>

  {/* Ortalanmış Başlık */}
  <Text style={styles.headerTitle}>Ürün Listesi</Text>
</View>

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
          >
            <View style={styles.cardInner}>
              <View style={styles.textGroup}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}₺</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

   
<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>

      {/* Sağ üst köşedeki kapatma ikonu */}
      <Pressable
        onPress={() => setModalVisible(false)}
        style={styles.modalCloseIcon}
      >
        <Text style={styles.modalCloseIconText}>×</Text>
      </Pressable>

      <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
      <Text style={styles.modalPrice}>{selectedProduct?.price}₺</Text>
      <Text style={styles.modalDesc}>{selectedProduct?.description}</Text>

  
     <Pressable
  style={styles.modalActionButton}
  onPress={() => {
    Alert.alert(
      "BİLGİ",                                  
      `${selectedProduct.name} Sepete Eklendi!`,
      [{ text: "Tamam" }]                        
    );
  }}
>
  <Text style={styles.modalActionText}>Sepete Ekle</Text>
</Pressable>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
  height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',   
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',   
  },
   cartButton: {
    position: 'absolute',
    right: 20,              
    top: '50%',             
    marginTop: -14,     
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    color: '#212121',
    textAlign: 'center',      
  },

  listContent: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },

  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  textGroup: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#212121',
  },
  price: {
    fontSize: 16,
    color: '#388E3C',
    marginTop: 6,
    fontWeight: '600',
  },

 
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
      position: 'relative'
  },
    modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    position: 'relative'  
  },
   modalCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5
  },
   modalCloseIconText: {
    fontSize: 24,
    color: '#888'
  },

 modalTitle: {
 },
  modalPrice: {

  },
  modalDesc:  { 

   },
   modalActionButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20
  },
    modalActionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10
  },
  modalPrice: {
    fontSize: 18,
    color: '#388E3C',
    marginBottom: 10
  },
  modalDesc: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalCloseButton: {
    backgroundColor: '#388E3C',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
});

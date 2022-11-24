import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,  
  View,
  Image,
  Button,
} from 'react-native';


const DATA = [
  {
    id: '01',
    title: 'Pastel de carne',
    preco:'5.00',
    imageUri:'https://receitatodahora.com.br/wp-content/uploads/2022/03/pastel-de-carne1.jpg',
  },
  {
    id: '02',
    title: 'Pastel de frango',
    preco:'6.50',
    imageUri:'https://img.itdg.com.br/tdg/images/recipes/000/076/789/354977/354977_original.jpg?mode=crop&width=710&height=400',
  },
  {
    id: '03',
    title: 'Pastel de queijo',
    preco:'7.00',
    imageUri:'https://loja.barracadoze.com.br/wp-content/uploads/sites/5/2020/10/pastel-queijo.jpg',
  },
];


const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  var itemsComprados = new Array();
  var valorPagar  = 0.0;



  const LongClick=(item)=>{
    alert('Você retirou o produto: '+ item.title);
  }
 
  const shortClick=(item)=>{
    alert('Você selecionou o produto:' + item.title);  
  }

  const addItem = (preco)=>{
    itemsComprados.push(preco);
  }
  const zerarValores =()=>{
    valorPagar= 0.0;
  }

  const removeItem = (preco)=>{
    itemsComprados.pop(preco);
  }

  const gerarPedido = ()=>{
    for(let i = 0; i < itemsComprados.length;i++){
      valorPagar += parseFloat(itemsComprados[i]);
    }

    alert('Você vai pagar:' + valorPagar.toFixed(2) + '\nItens comprados:' + itemsComprados.length);
    zerarValores();
    let i = 0;
    while(itemsComprados.length > 0){
      itemsComprados.pop();
    }

  }

  const renderItemNovo = ({ item })=> {
    return <View style={meuestilo.item} key={item.id}>
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, meuestilo.title]}
            onLongPress={() => { removeItem(item),LongClick(item)}}
            onPress={() => { addItem(item.preco),shortClick(item)}}
        >
            {/* para imagens locais */}
            {/* <Image source={ item.imageUri} style={meuestilo.itemImage} />  */}
            <Image source={{ uri: item.imageUri }} style={meuestilo.itemImage} /> 
            <View>
                <Text style={meuestilo.id}>Id: {item.id}</Text>
                <Text style={meuestilo.title}> {item.title}</Text>
            </View>
        </Pressable>
    </View>

}

  
  return (
    <SafeAreaView style={meuestilo.container}>
      <FlatList
        data={DATA}
        renderItem={renderItemNovo}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <Button
         onPress={() => { gerarPedido()}}
         title = "Gerar pedido"
         color={'purple'}

        ></Button>
    </SafeAreaView>
    
  );
};

const meuestilo = StyleSheet.create({
  container: {
    alignItems:'center',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'lightgrey'
  },
  item: {
    padding: 20,
    marginTop:10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor:'white',
    borderBottomWidth:1
  },
  title: {
    fontSize: 32,
  },
  
  itemImage: {
    width: 64,
    height: 64,
    marginLeft: 10,
    marginRight: 15,
    backgroundColor: '#eee',
    borderRadius: 40,
    borderColor:'black',
    borderWidth:1,
    elevation: 2
}
});

export default App;
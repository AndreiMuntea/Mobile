import {AsyncStorage} from 'react-native';


export const saveOrUpdate = async(key, object) => {
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(object));
}

export const getItem = async(key) => {
    try {
        return JSON.parse(await AsyncStorage.getItem(key));
    } catch (error) {
        console.log("Error fetching data ", key);
        return null;
    }
}

export const getAllBooksFromLocalStorage = async() => {
    try {
        var keys = await AsyncStorage.getAllKeys();
        console.log("ALL KEYS", keys);

        var data = await AsyncStorage.multiGet(keys);
        var books = [];

        for(let i = 0; i < data.length; ++i){
            let book = JSON.parse(data[i][1]);
            console.log(book);
            
            if(book.id){
                books.push(book);
            }
        }

        return books;
    } catch (error) {
        console.log("Error fetching data ");
        return [];
    }
}
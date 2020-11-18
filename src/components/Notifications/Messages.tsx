import React from 'react';

export const incorrectEmail = 'Неправильний формат електронної пошти'; 

export const emptyInput = 'Поле не може бути пустим'; 

export const incorrectPhone = 'Дане поле не є номером телефону'; 

export const minLength = (len:number)=>{
    return `Мінімальна довжина - ${len} символів`
}; 

export const maxLength = (len:number)=>{
    return `Максимальна довжина - ${len} символів`
}; 

export const tryAgain = 'Щось пішло не так. Спробуйте ще раз.'; 

export const successfulCreateAction = (name:string, itemName?:string)=>{
    return itemName ? `${name} ${itemName} успішно створено` : `${name} успішно створено`;
}; 

export const successfulEditAction = (name:string, itemName?:string)=>{
    return itemName ? `${name} ${itemName} успішно змінено` : `${name} успішно змінено`;
}; 

export const successfulDeleteAction = (name:string, itemName?:string)=>{
    return itemName ? `${name} ${itemName} успішно видалено` : `${name} успішно видалено`;
}; 

export const failCreateAction = (name:string)=>{
    return `Не вдалося створити ${name}`;
}; 

export const failEditAction = (name:string)=>{
    return `Не вдалося змінити ${name}`;
}; 

export const failDeleteAction = (name:string)=>{
    return `Не вдалося видалити ${name}`;
}; 

export const shouldContain = (items:string)=>{
    return `Поле повинне містити ${items}`;
};

export const fileIsUpload = "Файл завантажено"; 

export const fileIsNotUpload = "Проблема з завантаженням файлу"; 

export const possibleFileExtensions = (items:string)=>{
    return `Можливі розширення файлів: ${items}`;
}; 

export const fileIsTooBig = (maxSize:number)=>{
    return `Розмір файлу перевищує ${maxSize} Мб`
}; 
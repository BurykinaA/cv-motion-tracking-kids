// карточка товара
import React, { useContext, useState } from 'react';
import '../App.css';
import { Checkbox, Label, Radio,} from 'flowbite-react';
import { AuthContext } from '../context/context';
import {postTaskData} from '../data/editProject'

function OrderForm({ modalProps, setCartItem, setDel, }) {
  const handleSubmit=()=>{
    setCartItem([]),
     setDel(true),
    modalProps.setOpenModal(undefined);
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    
  }
  return (

    <form className="space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Оформление заказа</h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="ФИО" />
        </div>
        <input
          type="search" required id='result' placeholder='' 
          className="mr-[1%] inline-block block  w-full  text-sm text-gray-900  rounded-lg  border border-gray-300 focus:ring-gray-100 focus:border-0 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Аресс" />
        </div>
        <input 
          type="search" required id='result' placeholder='' 
          className="mr-[1%] inline-block block  w-full  text-sm text-gray-900  rounded-lg  border border-gray-300 focus:ring-gray-100 focus:border-0 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Индекс" />
        </div>
        <input 
          type="search" required id='result' placeholder='' 
          className="mr-[1%] inline-block block  w-full  text-sm text-gray-900  rounded-lg  border border-gray-300 focus:ring-gray-100 focus:border-0 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
        />
      </div>
      <button type="submit" className='bg-[#0075FF] mr-4 rounded-lg text-white hover:bg-blue-600'>Cохранить</button>                            
    </form>

  );
}

export default OrderForm;


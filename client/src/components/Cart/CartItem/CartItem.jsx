import { MdClose } from "react-icons/md";
import { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";


const CartItem = () => {
    const { cartItems, handleRemoveFromCart, handleCartProductQuantity } = useContext(AppContext);
    return (
        <div className="flex-grow overflow-y-auto">
            {cartItems?.map((item) => (
                <div key={item._id} className="flex gap-2 p-5 hover:bg-gray-100 cursor-pointer">
                    <div className="bg-gray-100 w-[60px] h-[60px] flex-shrink-0 ">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden">
                    
                        <span className="truncate text-base mb-[10px] pr-5 block font-semibold ">{item.name}</span>
                        <MdClose className="absolute top-0 right-0 cursor-pointer" onClick={() => handleRemoveFromCart(item)} />
                    
                        <div className="border flex border-gray-200 mb-2 h-8 w-fit">
                            <span className="flex items-center justify-center w-8 border-r cursor-pointer text-gray-600" onClick={() => handleCartProductQuantity('dec', item)}>-</span>
                            <span className="flex items-center justify-center w-10">{item.quantity}</span>
                            <span className="flex items-center justify-center w-8 border-l cursor-pointer text-gray-600" onClick={() => handleCartProductQuantity('inc', item)}>+</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                            <span>{item.quantity}</span>
                            <span>x</span>
                            <span className="text-purple-600 font-medium">&#8377;{item.price * item.quantity}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartItem;

interface InputProps { 
    placeholder: string; 
    reference?: any;
    type?: string;
}

export function Input({placeholder, reference, type = "text"}: InputProps) {
    return (
        <input ref={reference} placeholder={placeholder} type={type} className="px-4 py-2 border rounded w-full focus:outline-purple-400 transition-all" />
    );
}
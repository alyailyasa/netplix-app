export default function Modal({ children, onClose }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;zzz</button>
          {children}
        </div>
      </div>
    );
  }
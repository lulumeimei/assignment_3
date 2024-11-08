// src/components/Header.tsx

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/users" className="hover:underline">
              Users
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

# Menu Magic Feedback Loop

<!-- ![Menu Magic Logo](PLACEHOLDER_FOR_LOGO_OR_SCREENSHOT) -->

Menu Magic is a comprehensive web application designed for canteens (initially themed for colleges, adaptable for other settings) to streamline operations, enhance customer satisfaction, and promote sustainability. The platform bridges the gap between customers and nutrition with powerful tools for both users and administrators, now featuring an integrated AI voice assistant for interaction.

## Demo

[View Live Demo](#) (Link placeholder - Add your deployment URL here)

## Features

### For Customers
- **Digital Menu Browsing**: Explore the entire canteen menu with detailed nutritional information (Prices shown in ₹ INR).
- **Easy Ordering**: Place and track orders digitally.
- **Voice Assistant**: Interact with the menu and place orders using voice commands via the integrated Vapi AI.
- **Personalized Accounts**: Login to view order history and save preferences.
- **Feedback System**: Rate dishes and provide constructive feedback.
- **Nutrition Tracking**: Access detailed nutritional information for informed dining choices.
- **Waste Awareness**: See waste metrics to make environmentally conscious choices.

### For Administrators
- **Dashboard**: Real-time analytics on operations, orders (in ₹ INR), and feedback.
- **Order Management**: Track, update status (pending, preparing, ready, completed, cancelled), and fulfill customer orders efficiently.
- **Menu Management**: Easily add, edit, or remove menu items.
- **Staff Management**: Schedule and coordinate canteen staff.
- **Registration Desks**: Manage customer onboarding and event registration (if applicable).
- **Waste Analytics**: Track and analyze food waste to improve sustainability.
- **Feedback Dashboard**: Collect and respond to customer feedback.

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router
- **Voice AI**: Vapi (@vapi-ai/web)
- **Build Tool**: Vite
- **Data Storage**: LocalStorage (for demo purposes)

## Installation

1. Clone the repository
```bash
git clone https://github.com/Amlan2006/menu-magic-feedback-loop.git
cd menu-magic-feedback-loop
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Environment Setup

This project currently uses hardcoded keys for demonstration purposes (like the Vapi public key). For a production environment, you would typically use environment variables:

Create a `.env` file in the root directory:
```
# Example for Vapi Public Key (Store securely in production!)
# VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here 

# Example for API URL if using a backend
# VITE_APP_API_URL=your_api_url_here 
```
*Note: You would need to modify the code (`src/components/Header.tsx`) to read the Vapi key from `import.meta.env.VITE_VAPI_PUBLIC_KEY` if you implement this.* 

## Usage

### Customer Interface
1. Browse the menu on the homepage.
2. Click the "Voice Chat" button in the header to interact with the Vapi AI assistant.
3. Register/login to place orders and provide feedback.
4. Add items to your cart (manually or via voice).
5. Checkout and track your order status.
6. Provide ratings and feedback for items you've ordered.

### Admin Interface
1. Access the admin panel at `/admin`.
2. Login with admin credentials.
3. View the dashboard for analytics and recent orders.
4. Manage orders through the Orders panel (including updating status).
5. Add/edit menu items in Menu Management.
6. Schedule staff in Staff Management.
7. View and respond to feedback.

## Project Structure

```
menu-magic-feedback-loop/
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   │   ├── admin/      # Admin-specific components
│   │   └── ui/         # Reusable UI components
│   ├── context/        # React context providers
│   ├── data/           # Mock data and utilities
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   └── admin/      # Admin pages
│   └── types/          # TypeScript type definitions
├── .gitignore          # Git ignore rules
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Demo Credentials

### Customer User
- Email: `user@example.com`
- Password: `password123`

### Admin User
- Email: `admin@menumagic.com`
- Password: `admin123`

## Deployment

The application is configured for deployment to platforms like Vercel:

Refer to `DEPLOYMENT.md` for detailed instructions.

## Future Enhancements

- Backend integration for persistent data storage (replace LocalStorage).
- More sophisticated voice commands and interactions via Vapi.
- Mobile application for on-the-go ordering.
- Integration with payment gateways.
- Real-time order tracking updates.
- Inventory management system.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details (if one exists, otherwise add one).

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [Vapi AI](https://vapi.ai/)
- [Lucide Icons](https://lucide.dev/)

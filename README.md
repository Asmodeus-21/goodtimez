# Goodtimez - Premium 18+ Content Platform

A next-generation multi-tenant white-label platform for adult content creators, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Platform
- **Multi-Role System**: Fan, Creator, Brand/Agency, Admin portals
- **Premium UI/UX**: Glassmorphism, vibrant gradients, smooth animations
- **Real-Time Messaging**: Socket.io with PPV locked messages
- **Live Streaming**: WebRTC with interactive goals and tips
- **Payment Integration**: Stripe with token system
- **Content Protection**: Signed URLs, watermarking, DRM encryption

### White-Label Architecture (NEW!)
- **Single Creator Illusion**: Each fan experiences a personalized app
- **Dynamic Branding**: Custom colors, fonts, logos per creator
- **Subdomain Routing**: `creator.goodtimez.com` feels like standalone app
- **Discovery Lockout**: No cross-promotion, exclusive experience
- **Custom PWA**: Personalized app icons and names

### AI Features
- Content moderation (NSFW detection)
- Auto-tagging and captioning
- Churn prediction with retention campaigns
- Sentiment analysis

### Compliance
- KYC verification workflow
- Geofencing and access control
- DMCA takedown automation
- 2257 compliance records

## 📊 Tech Stack

- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 3.4.17
- **Database**: Prisma (PostgreSQL ready)
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Real-time**: Socket.io
- **Animations**: Framer Motion, GSAP
- **Fonts**: Google Fonts (Inter, Outfit)

## 🎯 Project Status

**Completion**: 75% of full platform
**Files Created**: 65+ files
**Lines of Code**: 9,000+
**Dependencies**: 873 packages

### Completed Phases
- ✅ Phase 1: Foundation & Design System
- ✅ Phase 2: Database & Authentication
- ✅ Phase 3: All Four Portals
- ✅ Phase 4: Payment Integration & Content Protection
- ✅ Phase 5: Live Streaming System
- ✅ Phase 6: Real-Time Messaging
- ✅ Phase 7: AI Features
- ✅ Phase 8: Compliance Systems
- ✅ Phase 9: Mobile PWA
- ✅ Phase 10: Analytics & Reporting
- ✅ Phase 11: White-Label Architecture (Core)

### Remaining Work
- Testing & QA
- Deployment & Infrastructure
- Performance Optimization
- Marketing & Legal Documents
- Beta Testing & Launch

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/goodtimez.git
cd goodtimez

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to see the demo.

## 🎭 Demo Mode

The platform includes a full demo mode that works without a database!

### Demo Credentials
- **Fan**: `fan@demo.com` / `demo`
- **Creator**: `creator@demo.com` / `demo`
- **Brand**: `brand@demo.com` / `demo`
- **Admin**: `admin@demo.com` / `demo`

### Demo URLs
- Main Demo: `http://localhost:3001/demo`
- Fan Portal: `http://localhost:3001/fan`
- Creator Portal: `http://localhost:3001/creator`
- Brand Portal: `http://localhost:3001/brand`
- Admin Portal: `http://localhost:3001/admin`

### White-Label Demo
- Luna Star: `http://localhost:3001/c/luna-star`
- Jade Rose: `http://localhost:3001/c/jade-rose`
- Scarlett Fox: `http://localhost:3001/c/scarlett-fox`

## 📁 Project Structure

```
Goodtimez/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── fan/               # Fan portal
│   ├── creator/           # Creator portal
│   ├── brand/             # Brand portal
│   ├── admin/             # Admin portal
│   ├── c/[creatorSlug]/   # White-label creator portals
│   └── demo/              # Demo login
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── ThemeProvider.tsx # White-label theming
│   └── ...
├── lib/                   # Utilities
│   ├── auth.ts           # Authentication
│   ├── stripe.ts         # Payment processing
│   ├── socket.ts         # Real-time messaging
│   ├── ai.ts             # AI features
│   ├── compliance.ts     # Legal/compliance
│   └── demo-data.ts      # Demo mode data
├── prisma/
│   └── schema.prisma     # Database schema (20+ models)
└── public/               # Static assets

```

## 🎨 Design System

### Colors
- **Brand Purple**: `#8b5cf6`
- **Neon Pink**: `#ec4899`
- **Neon Cyan**: `#06b6d4`
- **Neon Blue**: `#3b82f6`
- **Dark Background**: `#0a0a0f`

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)

### Effects
- Glassmorphism with backdrop blur
- Multi-color gradients
- Smooth spring animations
- Micro-interactions on hover

## 🔐 Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-secret-key"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Optional (for production)
OPENAI_API_KEY="sk-..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
```

## 📊 Database Schema

20+ Prisma models including:
- User & Authentication
- Multi-role Profiles (Fan, Creator, Brand, Admin)
- KYC & Compliance
- Content Management
- Payments & Wallet
- Subscriptions & Purchases
- Real-time Messaging
- Live Streaming
- Campaigns
- **CreatorBrand** (White-label)
- Notifications & Reports
- Audit Logs

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Setup
1. Set up PostgreSQL database (Supabase/Neon recommended)
2. Run Prisma migrations: `npx prisma migrate deploy`
3. Configure environment variables in Vercel
4. Deploy!

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run E2E tests
npm run test:e2e

# Run linter
npm run lint
```

## 📈 Performance

- **Lighthouse Score**: Target 90+
- **Page Load**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

This is a private commercial project. Contributions are not currently accepted.

## 📄 License

Proprietary - All Rights Reserved

## 🔗 Links

- **Documentation**: Coming soon
- **API Docs**: Coming soon
- **Support**: Coming soon

## 🎯 Roadmap

### Q1 2026
- ✅ Core platform development
- ✅ White-label architecture
- ⏳ Testing & QA
- ⏳ Beta launch

### Q2 2026
- Production deployment
- Marketing campaign
- Creator onboarding
- Public launch

## 💡 Key Innovations

1. **White-Label Architecture**: First platform to offer true single-creator illusion
2. **AI-Powered Features**: Churn prediction, auto-moderation, theme generation
3. **Premium UX**: Industry-leading design and animations
4. **Multi-Tenant**: One codebase, infinite branded experiences
5. **Compliance-First**: Built-in KYC, geofencing, DMCA automation

## 🏆 Achievements

- 65+ files created
- 9,000+ lines of code
- 873 npm packages
- 20+ database models
- 4 complete portals
- Full white-label system
- Real-time messaging
- Live streaming
- AI features
- Compliance systems

---

**Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and modern web technologies**

**Status**: Active Development | **Version**: 0.75.0 | **Last Updated**: January 2026

import React, { useState, useEffect, useMemo } from 'react';

// Data for FAA Brands
const faaBrandData = {
    "Australia": {
        "Smart Home & AI Tech": [
            "FAA™ Home Innovations", "FAA™ Smart Appliances", "FAA™ Home Automation (Global application, but active in AU)", "FAA™ Smart Home & AI Tech (General application, active in AU)"
        ],
        "Eco & Renewable Energy": [
            "FAA™ Green Future", "FAA™ Solar Systems (U.S., Africa, but active in AU)", "FAA™ EcoPower (Germany, South America, but active in AU)", "FAA™ CleanTech Solutions (China, India, but active in AU)", "FAA™ Solar Grid™", "FAA™ AgriTech AI™", "FAA™ Ocean Cleanup™", "FAA™ Carbon Zero™", "FAA™ WaterSmart™"
        ],
        "Fitness & Wellness": [
            "FAA™ Fitness Gear", "FAA™ ActiveLife Products", "FAA™ Wellness (Asia-Pacific, EU, but active in AU)", "FAA™ GymTech™", "FAA™ Outdoor Sports™", "FAA™ WearX™", "FAA™ Playgrounds™", "FAA™ Recovery™"
        ],
        "Consumer Electronics": [
            "FAA™ Electronics Hub (U.S., EU, Japan, but active in AU)", "FAA™ Smart Devices (Global application, but active in AU)", "FAA™ Gadget Zone (U.S., UK, South Africa, but active in AU)", "FAA™ Electronics Marketplace (China, Latin America, but active in AU)"
        ],
        "Auto & Mobility Solutions": [
            "FAA™ Electric Cars (U.S., Europe, but active in AU)", "FAA™ Smart Mobility (U.K., Japan, but active in AU)", "FAA™ E-Mobility (Global application, but active in AU)", "FAA™ Auto Parts™", "FAA™ 4x4 Gear™", "FAA™ E-Mobility™", "FAA™ Smart Transport™", "FAA™ Motorsport™"
        ],
        "Baby & Kids Essentials": [
            "FAA™ KidsCare", "FAA™ Baby Essentials (EU, Japan, but active in AU)", "FAA™ Child Innovation (South Africa, Asia-Pacific, but active in AU)", "FAA™ Baby & Kids™", "FAA™ Learning Hub™", "FAA™ Safety First™", "FAA™ SchoolGear™"
        ],
        "Sustainable Living": [
            "FAA™ Green Living (Global application, but active in AU)", "FAA™ Eco Products (U.S., EU, but active in AU)", "FAA™ Sustainable Home (Australia, South America)"
        ],
        "Fashion & Apparel": [
            "FAA™ Fashion Hub (Global application, but active in AU)", "FAA™ Apparel (U.K., China, but active in AU)", "FAA™ ActiveWear (EU, Japan, but active in AU)"
        ],
        "Industrial & Hardware": [
            "FAA™ Industrial Tools", "FAA™ Hardware Solutions (Global application, but active in AU)", "FAA™ Construction Gear (EU, Africa, but active in AU)", "FAA™ Mega Tools™", "FAA™ Trade Depot™", "FAA™ Home Build™", "FAA™ Industrial Solutions™", "FAA™ Smart Workshop™"
        ],
        "Gaming & Entertainment": [
            "FAA™ Game Zone (Global application, but active in AU)", "FAA™ Interactive Gaming (EU, U.S., but active in AU)", "FAA™ VR/AR Gaming (Japan, U.K., but active in AU)", "FAA™ Music AI™", "FAA™ FilmTech™", "FAA™ Gaming XR™", "FAA™ Digital Art™", "FAA™ Smart Museums™"
        ],
        "Tools & DIY Equipment": [
            "FAA™ DIY Essentials (U.S., U.K., but active in AU)", "FAA™ Power Tools (Europe, South Africa, but active in AU)", "FAA™ Home Repair (Global application, but active in AU)"
        ],
        "Outdoor, Adventure & Camping Gear": [
            "FAA™ Outback Gear™", "FAA™ Camping Pro™", "FAA™ Off-Grid Living™", "FAA™ Tactical™"
        ],
        "Home & Living Essentials": [
            "FAA™ Luxe Living™", "FAA™ Garden Pro™", "FAA™ Smart Kitchen™", "FAA™ HomeFix™", "FAA™ Eco Living™"
        ],
        "Retail, E-Commerce & Omnichannel Expansion": [
            "FAA™ HyperMall™", "FAA™ Express Logistics™", "FAA™ Global Pay™", "FAA™ Drone Delivery™", "FAA™ Next-Gen Commerce™"
        ]
    },
    "Japan": {
        "Smart Home & AI Tech": [
            "FAA™ Smart Solutions (U.S., EU, Japan)", "FAA™ Home Automation (Global application, but active in JP)"
        ],
        "Eco & Renewable Energy": [
            "FAA™ CleanTech Solutions (China, India, but active in JP)"
        ],
        "Consumer Electronics": [
            "FAA™ Electronics Hub (U.S., EU, Japan)", "FAA™ Smart Devices (Global application, but active in JP)"
        ],
        "Auto & Mobility Solutions": [
            "FAA™ Smart Mobility (U.K., Japan)", "FAA™ E-Mobility (Global application, but active in JP)", "FAA™ Urban Mobility™"
        ],
        "Baby & Kids Essentials": [
            "FAA™ Baby Essentials (EU, Japan)", "FAA™ Child Innovation (South Africa, Asia-Pacific, but active in JP)"
        ],
        "Fashion & Apparel": [
            "FAA™ ActiveWear (EU, Japan)"
        ],
        "Gaming & Entertainment": [
            "FAA™ VR/AR Gaming (Japan, U.K.)"
        ],
        "Robotics, AI & Smart Manufacturing": [
            "FAA Japan Robotics™", "FAA Quantum Computing™", "FAA AI Logistics™", "FAA FinTech Japan™", "FAA Urban Mobility™"
        ],
        "Sustainability, Green Tech & Future Cities": [
            "FAA Smart Cities™", "FAA EV Tech™", "FAA BioEnergy™", "FAA Japan Carbon Net Zero™", "FAA Oceanic AI™"
        ],
        "Culture, Gaming & Innovation": [
            "FAA Anime XR™", "FAA Gaming AI™", "FAA Fashion Japan™", "FAA VR Japan™", "FAA Digital Arts™"
        ],
        "Health & Medical": [
            "FAA Life™ Japan (Health, Wellness & Longevity Tech)", "FAA HealthTech Japan"
        ],
        "AI Systems": [
            "FAA AI Suite China (but active in JP)", "FAA AI Systems™ Japan (Deep Learning & AI Expansion)"
        ],
        "Financial Systems": [
            "FAA Financial Systems™ Japan (FinTech, Crypto & Banking AI)"
        ]
    },
    "South Africa": {
        "E-Commerce & Retail": [
            "FAA™ E-Commerce Solutions South Africa", "FAA™ Digital Marketplaces Africa™", "FAA™ Africa Commerce™", "FAA™ Mobile Pay™", "FAA™ TradeHub™", "FAA™ HyperMarket™", "FAA™ Drone Delivery SA™", "FAA™ Hypermarket UAE™ (Multi-category e-commerce for daily essentials & bulk buying, active in SA)", "FAA™ Organic Mart UAE™ (Sustainable products, organic food, and eco-commerce, active in SA)", "FAA™ Retail Solutions™", "FAA™ Retail Cloud AI", "FAA™ Omni-Commerce", "FAA™ Smart Retail AI", "FAA™ Logistics AI", "FAA™ Smart Payments", "FAA™ Metaverse Retail", "FAA™ Cross-Border Trade", "FAA™ AI Retail Intelligence", "FAA™ Secure Transactions", "FAA™ Omni-Commerce AI Sync", "FAA™ AI Smart Pricing", "FAA™ AI Checkout & Payment Gateway", "FAA™ Logistics AI™ – Auto Dispatch & Tracking"
        ],
        "Fashion & Apparel": [
            "FAA™ Fashion South Africa"
        ],
        "Sustainability Network": [
            "FAA™ Sustainability Network South Africa"
        ],
        "Electronics & Tech": [
            "FAA™ Electronics Marketplace (China, Latin America, but active in SA)", "FAA™ Tech Hub", "FAA™ Smart Gadgets", "FAA™ VR/AR Store", "FAA™ AudioTech", "FAA™ Gaming Zone"
        ],
        "DIY & Tools": [
            "FAA™ DIY Essentials (U.S., U.K., but active in SA)", "FAA™ Power Tools (Europe, South Africa)", "FAA™ Home Repair (Global application, but active in SA)", "FAA™ Builders Warehouse", "FAA™ Smart Tools", "FAA™ Home Renovation", "FAA™ Outdoor & Gardening", "FAA™ Camping & Adventure"
        ],
        "Baby & Kids Essentials": [
            "FAA™ Baby Essentials (EU, Japan, but active in SA)", "FAA™ Child Innovation (South Africa, Asia-Pacific)", "FAA™ Kids Hub", "FAA™ Toys & Play", "FAA™ Maternity Care", "FAA™ Learning & Growth", "FAA™ Safe Baby"
        ],
        "Industrial, Construction & Logistics": [
            "FAA Africa Build™", "FAA Smart Logistics™", "FAA PowerTech™", "FAA Transport AI™", "FAA BuilderPro™", "FAA™ Industrial Tools", "FAA™ Hardware Solutions", "FAA™ Construction Gear"
        ],
        "Agriculture, Food Supply & Sustainability": [
            "FAA Agri AI™", "FAA FoodTech™", "FAA Water Solutions™", "FAA Organic Africa™", "FAA FarmBots™"
        ],
        "Culture, Media & Entertainment": [
            "FAA Music Africa™", "FAA Film Africa™", "FAA AfroGaming™", "FAA Digital Arts™", "FAA African Heritage™"
        ],
        "Home Improvement & Decor": [
            "FAA™ HomeTech™", "FAA™ HomeEssentials™", "FAA™ GreenLiving™", "FAA™ DecoPro™", "FAA™ SmartSpaces™", "FAA™ LuxeInteriors™", "FAA™ EcoDesign™"
        ],
        "Health & Medical": [
            "FAA™ MedTech™", "FAA™ HealthGuard™", "FAA™ BioPharma™", "FAA™ MediCare™", "FAA™ PharmaTech™", "FAA™ BioLife™"
        ],
        "Hospitality & Food Services": [
            "FAA™ EcoDining™", "FAA™ FoodieTech™", "FAA™ GourmetPro™", "FAA™ LocalFood™", "FAA™ FreshMeal™", "FAA™ DineSmart™", "FAA™ EcoChef™"
        ]
    },
    "Africa (Pan-African Expansion)": {
        "Agriculture & Sustainability": [
            "FAA Green Africa™", "FAA Renewable Africa™", "FAA Carbon Zero™", "FAA Smart Farming™", "FAA CleanWater™", "FAA™ AgriTech™", "FAA™ FarmPro™", "FAA™ GreenHarvest™", "FAA™ AgroSolutions™", "FAA™ GrowSmart™", "FAA™ HydroTech™"
        ],
        "Infrastructure, Urban Expansion & Construction": [
            "FAA Build Africa™", "FAA Smart Roads™", "FAA Grid Africa™", "FAA Logistics Africa™", "FAA Housing™"
        ],
        "E-Commerce, Digital Trade & FinTech": [
            "FAA Digital Africa™", "FAA Smart Retail™", "FAA FinTech Africa™", "FAA Digital Payments™", "FAA HyperMall Africa™", "FAA™ E-Commerce Solutions Africa", "FAA™ Mobile Money Africa™", "FAA™ Marketplace Africa™", "FAA™ Digital ID Africa™", "FAA™ EcoCities Africa™"
        ],
        "Culture, Gaming & Creative Expansion": [
            "FAA AfroMetaverse™", "FAA Digital Film™", "FAA Gaming Africa™", "FAA AI Music™", "FAA Digital Arts Africa™", "AFRICAN GROOVE GRID™"
        ],
        "Automotive & Transport": [
            "FAA™ AutoTech™", "FAA™ FleetSmart™", "FAA™ TransportAI™", "FAA™ CarPro™", "FAA™ GreenDrive™", "FAA™ RoadTech™"
        ],
        "Health & Medical": [
            "FAA™ MedTech™", "FAA™ HealthGuard™", "FAA™ BioPharma™", "FAA™ MediCare™", "FAA™ PharmaTech™", "FAA™ BioLife™"
        ],
        "Hospitality & Food Services": [
            "FAA™ EcoDining™", "FAA™ FoodieTech™", "FAA™ GourmetPro™", "FAA™ LocalFood™", "FAA™ FreshMeal™", "FAA™ DineSmart™", "FAA™ EcoChef™"
        ],
        "Home Improvement & Decor": [
            "FAA™ HomeTech™", "FAA™ HomeEssentials™", "FAA™ GreenLiving™", "FAA™ DecoPro™", "FAA™ SmartSpaces™", "FAA™ LuxeInteriors™", "FAA™ EcoDesign™"
        ],
        "Industrial & Manufacturing": [
            "FAA™ FactoryTech™", "FAA™ BuildPro™", "FAA™ PowerTech™", "FAA™ IndustrySmart™", "FAA™ WorkGear™", "FAA™ PowerPro™"
        ],
        "Technology, AI & Gadgets": [
            "FAA™ TechGenius™", "FAA™ RoboTech™", "FAA™ SmartGadgets™", "FAA™ AIPro™", "FAA™ DataTech™", "FAA™ VisionTech™", "FAA™ SoundTech™"
        ]
    },
    "Dubai (UAE)": {
        "E-Commerce & Retail": [
            "FAA™ Dubai Commerce Hub", "FAA™ UAE Smart Marketplaces™", "FAA™ Global Dropshipping UAE", "FAA™ AI Payment Solutions UAE", "FAA™ Logistics AI UAE", "FAA™ Luxury Dubai™", "FAA™ Smart Fashion UAE™", "FAA™ Diamond Trade™", "FAA™ Smart Living UAE™", "FAA™ Furniture Hub UAE™", "FAA™ Tech Zone Dubai™", "FAA™ Auto Dubai™", "FAA™ Smart Mobility UAE™", "FAA™ Aviation Trade Dubai™", "FAA™ B2B Trade Dubai™", "FAA™ Hypermarket UAE™", "FAA™ Organic Mart UAE™", "FAA™ Fulfillment Dubai™", "FAA™ Warehousing UAE™", "FAA™ Global Freight UAE™"
        ],
        "Cloud Computing & AI Solutions": [
            "FAA Cloud Dubai", "FAA AI Suite China (active in UAE)"
        ],
        "Financial Systems": [
            "FAA Financial Systems Dubai"
        ],
        "Automotive Solutions": [
            "FAA Automotive Solutions Saudi Arabia (active in UAE)"
        ]
    },
    "Global (General Application / Multiple Regions)": {
        "Core FAA™ System Brands": [
            "FAA™ (Primary Legal Entity & Global Compliance System)", "FAA Inline Compliance™", "FAA Atom-Level Verification™", "FAA Governance Ledger™", "FAA Legal Governance™", "FAA Global Compliance Network™", "FAA Compliance Systems™", "FAA Global Monitoring™", "FAA Financial Systems™", "FAA Blockchain Integration™", "FAA Data Protection™", "FAA AI Compliance™", "FAA Trademark Integrity™", "FAA Global Connectivity™", "FAA™ Quantum Nexus™", "FAA™ Edge AI Execution™", "FAA™ Multi-Layer Data Security™", "FAA™ AI Monitoring & Enforcement™", "FAA™ Quantum Nexus™", "FAA™ QuantumAI™", "FAA™ NeuralNet™", "FAA™ RoboticsAI™", "FAA™ AI Vision™", "FAA™ AI Assist™", "FAA™ PredictiveTech™", "FAA™ Algorithmic Compliance™", "FAA™ AI Fusion™", "FAA™ Cognitive Computing™", "FAA™ Blockchain Governance™", "FAA™ Secure ID™", "FAA™ Risk Center™", "FAA™ Trade Verification™", "FAA™ Digital Currency Systems™", "FAA™ Market Intelligence™", "FAA™ AI-Driven Compliance™", "FAA™ Cyber Resilience™", "FAA™ LegalTech Solutions™", "FAA™ Quantum Security™", "FAA™ Supply Chain Integrity™", "FAA™ Predictive Finance™", "FAA™ AI Trade Bots™", "FAA™ Climate AI™", "FAA™ Deep Learning Systems™", "FAA™ InsurTech™", "FAA™ Smart Cities AI™", "FAA™ IoT Security™", "FAA™ 6G Connectivity™", "FAA™ Green Computing™", "FAA™ Biotech Data™", "FAA™ AI Robotics™", "FAA™ Neuro AI™", "FAA™ Digital Twin Solutions™"
        ],
        "E-Commerce & Retail": [
            "Fruitful Global™ (FAA’s Flagship E-Commerce Hub)", "FAA™ E-Commerce Solutions", "FAA™ Dropship™", "FAA™ Pay™", "FAA™ E-Store™", "FAA™ Marketplace™", "FAA™ OmniCommerce™", "FAA™ Digital Marketplaces™", "FAA™ Licensing Hub™", "FAA™ Omni-Storefront System", "FAA™ AI Payment Gateway", "FAA™ E-Market™", "FAA™ DigitalCart™", "FAA™ AI Merchandising™", "FAA™ RetailSync™", "FAA™ CloudShop™", "FAA™ SmartCheckout™", "FAA™ VR Shopping™", "FAA™ Digital Malls™", "FAA™ Subscription Hub™", "FAA™ SocialCommerce™", "FAA™ Retail Cloud AI", "FAA™ Omni-Commerce", "FAA™ Smart Retail AI", "FAA™ Cross-Border Trade", "FAA™ AI Retail Intelligence", "FAA™ Secure Transactions", "FAA™ Metaverse Retail", "FAA™ VirtualCommerce™", "FAA™ RetailAI™", "FAA™ SmartRetail™", "FAA™ AICommerce™", "FAA™ CloudPayments™"
        ],
        "AI & Data Systems": [
            "FAA AI Suite", "FAA AI™", "FAA Data Hub™", "FAA Edge™", "FAA Cyber™", "FAA™ Algorithm Solutions™", "FAA™ AI Engine™", "FAA™ Digital Compliance™", "FAA™ AI System Verification™", "FAA™ Advanced Algorithm™", "FAA™ AI Data Solutions™", "FAA™ Data Solutions™", "FAA™ DataAnalytics™", "FAA™ Marketlytics™", "FAA™ CustomerEngage™", "FAA™ AI Assistants™", "FAA™ AIChat™", "FAA™ AIResearch™", "FAA™ AIContent™", "FAA™ AI Thought Processors™", "FAA™ The Singularity Nexus™"
        ],
        "Financial & FinTech": [
            "FAA Financial Systems", "FAA Payments", "FAA Index™", "FAA Invest™", "FAA Wealth™", "FAA Trade™", "FAA FinTech™", "FAA Financial Engine™", "FAA Inline Financials™", "FAA™ CryptoPay™", "FAA™ DigitalBank™", "FAA™ SecurePay™", "FAA™ Blockchain™", "FAA™ NFT Solutions™", "FAA™ Digital Wealth™", "FAA™ PersonalFinance™", "FAA™ CrowdFunding™", "FAA™ AITrading™", "FAA™ CryptoAI™", "FAA™ TokenX™", "FAA™ RegTech Solutions™", "FAA™ WealthAI™", "FAA™ BlockchainBank™", "FAA™ SmartFinance™", "FAA™ AutoInvest™", "FAA™ DeFiHub™", "FAA™ DigitalLend™", "FAA™ PayTrack™"
        ],
        "Sustainability & Green Tech": [
            "FAA Sustainability Network", "FAA GreenTech™", "FAA Earth™", "FAA Grid™", "FAA EV™", "FAA Green™", "FAA™ EcoGoods™", "FAA™ Green Living™", "FAA™ Eco Products™", "FAA™ Sustainable Home™", "FAA™ BioEnergy™", "FAA™ Urban Green™", "FAA™ EcoAI™", "FAA™ CarbonTrack™", "FAA™ Renewable Grid™", "FAA™ Green Agriculture™", "FAA™ Smart Irrigation™", "FAA™ Sustainable Cities™", "FAA™ EcoHomes™", "FAA™ ClimateAI™", "FAA™ EcoCommerce™", "FAA™ Bioinformatics™", "FAA™ WasteTech™", "FAA™ CircularEconomy™", "FAA™ GreenBuildings™", "FAA™ SmartEnergy™", "FAA™ Carbon Offset™", "FAA™ Zero-Waste Manufacturing™", "FAA™ Climate Resilience™"
        ],
        "Healthcare & Biotech": [
            "FAA HealthTech", "FAA Biotech", "FAA MedTech™", "FAA Pharma™", "FAA™ Wellness™", "FAA™ BioTech™", "FAA™ HealthGuard™", "FAA™ BioPharma™", "FAA™ MediCare™", "FAA™ PharmaTech™", "FAA™ BioLife™", "FAA™ WellnessTech™", "FAA™ HealthAI™", "FAA™ AI Health™", "FAA™ MedicalAI™", "FAA™ BioSensing™", "FAA™ SmartHospital™", "FAA™ AI Nutrition™", "FAA™ TeleHealth AI™", "FAA™ AI Therapy™", "FAA™ Genomics AI™", "FAA™ MedAssist™", "FAA™ MedData™", "FAA™ MedicalTech™", "FAA™ Vaccines™", "FAA™ Research™"
        ],
        "Automotive & Mobility": [
            "FAA Auto Solutions", "FAA Mobility", "FAA Auto™", "FAA Mobility™", "FAA™ AutoTech™", "FAA™ Electric Cars", "FAA™ E-Mobility", "FAA™ Smart Mobility", "FAA™ Auto Accessories", "FAA™ EV Charging Stations", "FAA™ Car Care & Detailing", "FAA™ Smart Transport", "FAA™ Auto Luxury", "FAA™ MobilityTech™", "FAA™ Mobility™", "FAA™ Autonomous Vehicles™", "FAA™ Self-Driving Cars™"
        ],
        "Fashion & Apparel": [
            "FAA Fashion Brands", "FAA Fashion Hub", "FAA Apparel", "FAA ActiveWear", "FAA™ FashionAI™", "FAA™ BeautyAI™"
        ],
        "Electronics & Tech": [
            "FAA Tech Brands", "FAA Electronics", "FAA™ Smart Devices", "FAA™ Gadget Zone", "FAA™ Electronics Marketplace", "FAA™ TechGenius™", "FAA™ RoboTech™", "FAA™ SmartGadgets™", "FAA™ AIPro™", "FAA™ DataTech™", "FAA™ VisionTech™", "FAA™ SoundTech™"
        ],
        "Telecommunications & IoT": [
            "FAA Connect™", "FAA IoT™", "FAA Fiber™", "FAA™ IoT Solutions™", "FAA™ Telecom Networks™", "FAA™ EdgeComputing™", "FAA™ Industrial IoT™"
        ],
        "Luxury & Premium Markets": [
            "FAA Luxe™", "FAA Prime™", "FAA Collect™", "FAA™ LuxeTech™", "FAA™ Exclusive™"
        ],
        "Manufacturing & Supply Chain": [
            "FAA Supply™", "FAA Industry™", "FAA TradeHub™", "FAA Warehousing™", "FAA™ SupplyChain™", "FAA™ SmartLogistics™", "FAA™ Global Warehousing™", "FAA™ Supply Chain Integrity™", "FAA™ Automated Supply Chains™", "FAA™ Smart Logistics Warehousing™", "FAA™ Robotic Process Automation™"
        ],
        "Entertainment, Arts & Books": [
            "FAA™ Music Store", "FAA™ Bookstore AI", "FAA™ Comics & Collectibles", "FAA™ Film & Photography", "FAA™ Art & Decor", "FAA™ Music™", "FAA™ FilmTech™", "FAA™ Digital Studios™", "FAA™ eSports™", "FAA™ FusionBeat™", "FAA™ VibraGlow™", "FAA™ ConnectVibe™", "FAA™ SoundWave™", "FAA™ BeatStream™", "FAA™ SoundTrack™", "FAA™ Vibravibe™", "FAA™ Entertainment™", "FAA™ Gaming Zone", "FAA™ Interactive Gaming", "FAA™ VR/AR Gaming", "FAA™ Gaming Africa™", "FAA™ AfroGaming™", "FAA™ Anime XR™", "FAA™ Gaming AI™", "FAA™ VR Japan™", "FAA™ Digital Arts™", "AFRICAN GROOVE GRID™", "Fruitful Crate Dance™", "DANCE BOX™", "BOOGIEBIN™", "BOUNCEBOX™", "DANCEPOD™", "GROOVECASE™", "BEATBIN™"
        ],
        "Tools & DIY Equipment": [
            "FAA™ DIY Essentials", "FAA™ Power Tools", "FAA™ Home Repair"
        ],
        "Pets & Veterinary Retail": [
            "FAA™ PetCare", "FAA™ Vet Hub", "FAA™ Smart Pet", "FAA™ Exotic Pets", "FAA™ Sustainable Pet", "FAA™ PetTech™"
        ],
        "Travel, Outdoors & Adventure": [
            "FAA™ Travel Essentials", "FAA™ Adventure Gear", "FAA™ Smart Luggage", "FAA™ Camping Store", "FAA™ Aviation Store", "FAA™ TravelTech™", "FAA™ Global Disaster Relief™", "FAA™ Personalized Travel™"
        ],
        "Education & Knowledge": [
            "FAA™ AI Learning™", "FAA™ EduTech™", "FAA™ Learning & Growth", "FAA™ Digital Classrooms™", "FAA™ EdTech™", "FAA™ Personalized Learning™"
        ],
        "Government, Policy & Public Sector": [
            "FAA Governance™", "FAA Public Infrastructure™", "FAA Defense Strategy™", "FAA™ AI Policy Compliance™", "FAA™ Data Protection & Cyber Governance™", "FAA™ Government Trade Relations™", "FAA™ E-Governance™", "FAA™ Global Ethics™"
        ],
        "Job Services": [
            "FAA™ Talent™", "FAA™ Careers™", "FAA™ Jobs™", "FAA™ Workforce™", "FAA™ Consulting™", "FAA™ AI-Driven HR Analytics™", "FAA™ AI Remote Work Solutions™", "FAA™ AIRecruit™", "FAA™ Future of Work™"
        ],
        "Natural Resources & Mining": [
            "FAA Mining™", "FAA Oil & Gas™", "FAA WaterTech™", "FAA Forestry™", "FAA Agribusiness™", "FAA Resource Extraction™", "FAA Precious Metals™", "FAA Oil & Gas Compliance™", "FAA™ Energy™", "FAA™ Petrochemicals™", "FAA™ Exploration™", "FAA™ Refining™", "FAA™ Distribution™"
        ],
        "Pharmaceuticals": [
            "FAA Pharma™", "FAA BioMed™", "FAA MedTech™", "FAA Vaccines™", "FAA Research™", "FAA™ PharmaTech™"
        ],
        "Quality Assurance": [
            "FAA Quality™", "FAA Compliance™", "FAA Auditing™", "FAA Inspections™", "FAA Standards™"
        ],
        "Utilities & Essential Services": [
            "FAA Energy Grid™", "FAA WaterTech™", "FAA™ Energy Systems™", "FAA™ Water Management AI™", "FAA™ EnergyPod™", "FAA™ Renewables™", "FAA™ SmartEnergy™"
        ],
        "Venture Capital & Startup Development": [
            "FAA Startup Lab™", "FAA Investor Network™", "FAA Fintech Accelerator™", "FAA™ Capital™", "FAA™ CrowdFunding™"
        ],
        "Wholesale Trade & Import/Export": [
            "FAA Global Trade™", "FAA Wholesale Markets™", "FAA Export Compliance™", "FAA™ Wholesale™", "FAA™ Wholesale Distribution™", "FAA™ International Trade Compliance™", "FAA™ Business Licensing Systems™"
        ],
        "Cross-Border E-Commerce & Finance": [
            "FAA Import/Export Compliance™", "FAA Currency Exchange™", "FAA Digital Trade Agreements™", "FAA™ Global Payments™", "FAA™ Financial Trust™", "FAA™ International Banking™", "FAA™ Global Currency Exchange™"
        ],
        "Youth Empowerment & Workforce Development": [
            "FAA Youth Empowerment™", "FAA Apprenticeships™", "FAA Workforce AI™"
        ],
        "Zero-Carbon & Climate Change Mitigation": [
            "FAA Carbon Offset™", "FAA Zero-Waste Manufacturing™", "FAA Climate Resilience™"
        ],
        "Other General FAA™ Brands (Global/Cross-Cutting)": [
            "Fruitful™", "Playing with the Seed™", "We Can Touch the Seed™", "The Lost Standing FAA™", "Baobab™", "Water the Seed™", "Global Connectivity with Meta™", "Fruital™", "FAA Legal Lock™", "MetaGlobal™", "Sustain™", "Global Security™", "Cosmic™", "Visionary™", "MetaFinance™", "Baobab Security Network™", "Fruitful Crate Dance™", "Solaris™", "ValueConnect™", "CashChain™", "FAA™ Execution Framework", "FAA™ Risk Analysis Algorithm™", "FAA™ Compliance Algorithm™", "FAA™ Algorithmic Auditing™", "FAA™ Algorithm Integration™", "FAA™ Security Algorithm™", "FAA™ Data Integrity Algorithm™", "FAA™ Performance Algorithm™", "FAA™ Algorithmic Verification™", "FAA™ Financial Systems Audit™", "FAA™ Data Monitoring™", "FAA™ Algorithmic Optimization™", "FAA™ Predictive AI™", "FAA™ AI Retail Systems™", "FAA™ AI E-Commerce Growth™", "FAA™ Blockchain Payments™", "FAA™ Global Payment Gateway™", "FAA™ AI Financial Risk™", "FAA™ AI-Based Legal Compliance™", "FAA™ AI Marketing™", "FAA™ AI Digital Ad Solutions™", "FAA™ AI Predictive Consumer Behavior™", "FAA™ AI Conversational Commerce™", "FAA™ AI Business Strategy™", "FAA™ Legal AI Compliance™", "FAA™ AI Content Compliance™", "FAA™ AI Investment Forecasting™", "FAA™ AI Business Risk Assessment™", "FAA™ AI E-Governance™", "FAA™ AI-Financial Decision-Making™", "FAA™ AI Media Compliance™", "FAA™ AI Supply Chain Optimization™", "FAA™ AI Retail Analytics™", "FAA™ AI Energy Management™", "FAA™ AI Smart Agriculture™", "FAA™ AI Medical Compliance™", "FAA™ AI Healthcare Solutions™", "FAA™ AI Autonomous Vehicles™", "FAA™ AI Quantum Computing™", "FAA™ AI Cryptocurrency Trading™", "FAA™ AI NFT Marketplace™", "FAA™ AI Predictive Sports Betting™", "FAA™ AI Fraud Prevention™", "FAA™ AI Anti-Money Laundering™", "FAA™ AI Border Security™", "FAA™ AI Anti-Counterfeit Detection™", "FAA™ AI Brand Protection™", "FAA™ AI Automated Legal Contracts™", "FAA™ AI Global Ethics™", "FAA™ AI-Driven HR Analytics™", "FAA™ AI Remote Work Solutions™", "FAA™ AI Enterprise Security™", "FAA™ AI Deep Learning Insights™", "FAA™ AI Smart Home Devices™", "FAA™ AI Augmented Reality™", "FAA™ AI Virtual Reality Commerce™", "FAA™ AI Streaming Content Protection™", "FAA™ AI Immersive Experience™", "FAA™ AI Global Traffic Systems™", "FAA™ AI Weather Forecasting™", "FAA™ AI Renewable Energy Grid™", "FAA™ AI Smart Water Management™", "FAA™ AI Blockchain Digital Identity™", "FAA™ AI Biometric Security™", "FAA™ AI Military Defense Tech™", "FAA™ AI Satellite Imaging™", "FAA™ AI Global Communications™", "FAA™ AI Personalized HealthTech™", "FAA™ AI Social Media Analysis™", "FAA™ AI Mobile Payment Systems™", "FAA™ AI Consumer Sentiment Analysis™", "FAA™ AI Self-Learning Algorithms™", "FAA™ AI Risk Mitigation Systems™", "FAA™ AI Global Currency Exchange™", "FAA™ AI Market Disruption Forecasting™", "FAA™ AI Deepfake Detection™", "FAA™ AI Climate Change Analytics™", "FAA™ AI Business Model Innovation™", "FAA™ AI Stock Market Predictions™", "FAA™ AI Biometric Authentication™", "FAA™ AI Voice Recognition™", "FAA™ AI Autonomous Drone Systems™", "FAA™ AI Smart Farming™", "FAA™ AI Predictive Cybersecurity™", "FAA™ AI Natural Disaster Prediction™", "FAA™ AI Blockchain Trust Systems™", "FAA™ AI Space Exploration Tech™", "FAA™ AI Robotic Process Automation™", "FAA™ AI Personalized Learning™", "FAA™ AI Self-Driving Cars™", "FAA™ AI Future of Work™", "FAA™ AI Edge Computing™", "FAA™ AI Smart Retail Automation™", "FAA™ AI Personalized Travel™", "FAA™ AI Global Disaster Relief™", "FAA™ QuantumAI™", "FAA™ NeuralNet™", "FAA™ SmartGrid™", "FAA™ AI Vision™", "FAA™ AI Assist™", "FAA™ PredictiveTech™", "FAA™ AI Fusion™", "FAA™ Cognitive Computing™", "FAA™ E-Market™", "FAA™ DigitalCart™", "FAA™ AI Merchandising™", "FAA™ RetailSync™", "FAA™ CloudShop™", "FAA™ SmartCheckout™", "FAA™ VR Shopping™", "FAA™ Digital Malls™", "FAA™ Subscription Hub™", "FAA™ SocialCommerce™", "FAA™ BioEnergy™", "FAA™ Urban Green™", "FAA™ EcoAI™", "FAA™ CarbonTrack™", "FAA™ Renewable Grid™", "FAA™ Green Agriculture™", "FAA™ Smart Irrigation™", "FAA™ Sustainable Cities™", "FAA™ EcoHomes™", "FAA™ ClimateAI™", "FAA™ BlockchainBank™", "FAA™ SmartFinance™", "FAA™ AutoInvest™", "FAA™ DeFiHub™", "FAA™ DigitalLend™", "FAA™ PayTrack™", "FAA™ CryptoAI™", "FAA™ TokenX™", "FAA™ RegTech Solutions™", "FAA™ WealthAI™", "FAA™ AI Health™", "FAA™ WellnessTech™", "FAA™ MedicalAI™", "FAA™ BioSensing™", "FAA™ SmartHospital™", "FAA™ AI Nutrition™", "FAA™ PharmaTech™", "FAA™ TeleHealth AI™", "FAA™ AI Therapy™", "FAA™ Genomics AI™", "FAA™ Algorithmic Auditing™", "FAA™ Blockchain Governance™", "FAA™ Secure ID™", "FAA™ Risk Center™", "FAA™ Trade Verification™", "FAA™ Digital Currency Systems™", "FAA™ Market Intelligence™", "FAA™ AI-Driven Compliance™", "FAA™ Cyber Resilience™", "FAA™ LegalTech Solutions™", "FAA™ Quantum Security™", "FAA™ Supply Chain Integrity™", "FAA™ Predictive Finance™", "FAA™ AI Trade Bots™", "FAA™ Climate AI™", "FAA™ Deep Learning Systems™", "FAA™ InsurTech™", "FAA™ IoT Security™", "FAA™ 6G Connectivity™", "FAA™ Green Computing™", "FAA™ Biotech Data™", "FAA™ Neuro AI™", "FAA™ Digital Twin Solutions™"
        ]
    },
    "China": {
        "Cloud Computing & AI Solutions": [
            "FAA AI Suite China", "FAA Cloud Services™", "FAA™ Smart Appliances"
        ],
        "Supply Chain Automation": [
            "FAA Supply Chain Automation™", "FAA™ Supply™", "FAA™ IoT™", "FAA™ TradeHub™"
        ],
        "Logistics Solutions": [
            "FAA Logistics Solutions™"
        ],
        "Electronics & Tech": [
            "FAA Electronics China", "FAA™ Smart Devices", "FAA™ Electronics Marketplace"
        ],
        "Sustainability Network": [
            "FAA Sustainability Network China", "FAA™ CleanTech Solutions", "FAA™ Solar Systems"
        ],
        "Fashion & Apparel": [
            "FAA Apparel"
        ],
        "E-Mobility": [
            "FAA™ E-Mobility"
        ]
    },
    "India": {
        "E-Commerce Solutions": [
            "FAA™ E-Commerce Solutions™"
        ],
        "Global Expansion": [
            "FAA™ Global Expansion™"
        ],
        "AI Solutions": [
            "FAA™ AI Solutions™", "FAA AI Suite China (active in India)", "FAA™ CleanTech Solutions", "FAA™ ActiveLife Products"
        ],
        "Telecommunications & IoT": [
            "FAA Mobility India", "FAA Fiber™"
        ],
        "Retail": [
            "FAA Retail"
        ]
    },
    "United Kingdom": {
        "Fashion": [
            "FAA Fashion UK", "FAA Apparel", "FAA™ Smart Solutions"
        ],
        "Electronics": [
            "FAA Electronics UK"
        ],
        "Financial Systems": [
            "FAA Financial Systems UK", "FAA AI™", "FAA Wealth™", "FAA Pharma™"
        ],
        "Smart Home & AI Tech": [
            "FAA™ Smart Solutions", "FAA™ Home Innovations"
        ],
        "Sustainable Living": [
            "FAA™ Green Living"
        ],
        "Fitness & Wellness": [
            "FAA™ Wellness", "FAA™ Fitness Gear"
        ],
        "DIY & Tools": [
            "FAA™ DIY Essentials"
        ],
        "Smart Mobility": [
            "FAA™ Smart Mobility"
        ],
        "Baby & Kids Essentials": [
            "FAA™ KidsCare"
        ]
    },
    "United States": {
        "Cloud Computing & AI Solutions": [
            "FAA Cloud USA", "FAA Cloud™", "FAA™ Smart Solutions"
        ],
        "E-Commerce Solutions": [
            "FAA™ E-Commerce Solutions USA", "FAA™ E-Commerce Solutions™", "FAA™ Legal Compliance Automation™", "FAA™ Atom-Level Verification™", "FAA™ HomeMart™", "FAA™ Wholesale Distribution™"
        ],
        "Sustainability Network": [
            "FAA Sustainability Network USA", "FAA™ Solar Systems", "FAA™ GreenTech™", "FAA™ Eco Products"
        ],
        "Financial Systems": [
            "FAA Financial Systems", "FAA Invest™", "FAA Capital™", "FAA Crypto™"
        ],
        "Luxury & Premium Markets": [
            "FAA Luxe™"
        ],
        "Healthcare & Biotech": [
            "FAA MedTech™", "FAA Pharma™", "FAA™ BioMed™", "FAA™ Vaccines™", "FAA™ Research™"
        ],
        "Fitness & Wellness": [
            "FAA Fit™", "FAA Wellness™", "FAA Nutrition™", "FAA Sports™", "FAA Active™", "FAA™ Fitness Gear", "FAA™ Health Essentials"
        ],
        "Consumer Goods": [
            "FAA HomeGoods™", "FAA Apparel™", "FAA Health & Beauty™", "FAA Food & Beverage™", "FAA Electronics™", "FAA™ Electronics Hub"
        ],
        "Data & Technology": [
            "FAA Cloud™", "FAA AI™", "FAA CyberSecurity™", "FAA Data Solutions™", "FAA IoT™"
        ],
        "Education": [
            "FAA EduTech™", "FAA HigherEd™", "FAA Training™", "FAA Learning™", "FAA Language Solutions™"
        ],
        "Industrial Manufacturing & Robotics": [
            "FAA Industrial Solutions™", "FAA Manufacturing™", "FAA SupplyChain™", "FAA Automation™", "FAA Construction™"
        ],
        "Job Services": [
            "FAA Talent™", "FAA Careers™", "FAA Jobs™", "FAA Workforce™", "FAA Consulting™"
        ],
        "Knowledge & Consulting": [
            "FAA Strategy™", "FAA Management™", "FAA Innovation™", "FAA Legal™", "FAA Tax™"
        ],
        "Logistics & Supply Chain": [
            "FAA Logistics™", "FAA Supply™", "FAA Shipping™", "FAA Fleet™", "FAA Distribution™"
        ],
        "Manufacturing": [
            "FAA Industrial™", "FAA LightManufacture™", "FAA Precision™", "FAA Quality™", "FAA Fabrication™"
        ],
        "Natural Resources": [
            "FAA Mining™", "FAA Oil & Gas™", "FAA WaterTech™", "FAA Forestry™", "FAA Agribusiness™"
        ],
        "Oil & Gas": [
            "FAA Energy™", "FAA Petrochemicals™", "FAA Exploration™", "FAA Refining™", "FAA™ Distribution™"
        ],
        "Pharmaceuticals": [
            "FAA Pharma™", "FAA BioMed™", "FAA MedTech™", "FAA Vaccines™", "FAA Research™"
        ],
        "Quality Assurance": [
            "FAA Quality™", "FAA Compliance™", "FAA Auditing™", "FAA Inspections™", "FAA Standards™"
        ],
        "Automotive & Mobility": [
            "FAA™ Electric Cars", "FAA™ AutoTech™"
        ],
        "Baby & Kids Essentials": [
            "FAA™ Baby Essentials"
        ],
        "DIY & Tools": [
            "FAA™ DIY Essentials"
        ]
    },
    "Germany": {
        "Cloud Computing & AI Solutions": [
            "FAA Cloud"
        ],
        "Financial Systems": [
            "FAA Financial Systems UK (active in Germany)", "FAA AI™", "FAA Wealth™", "FAA Pharma™"
        ],
        "Manufacturing & Supply Chain": [
            "FAA Industry™", "FAA Supply™", "FAA Warehousing™"
        ],
        "Automotive & Mobility": [
            "FAA Auto™", "FAA Mobility™"
        ],
        "Green Energy": [
            "FAA Grid™", "FAA™ EcoPower", "FAA™ Green Future"
        ]
    },
    "Canada": {
        "North America": [
            "FAA Cloud USA (active in Canada)", "FAA E-Commerce Solutions USA (active in Canada)", "FAA Sustainability Network (active in Canada)"
        ],
        "E-Commerce & Retail": [
            "FAA Commerce™"
        ],
        "Sustainability & Green Energy": [
            "FAA EV™", "FAA Earth™"
        ],
        "Healthcare & Biotech": [
            "FAA Pharma™"
        ],
        "Fitness & Wellness": [
            "FAA™ Health Essentials"
        ]
    },
    "Brazil": {
        "E-Commerce & Retail": [
            "FAA Commerce™", "FAA Dropship™"
        ],
        "Manufacturing & Supply Chain": [
            "FAA Warehousing™"
        ],
        "Automotive & Mobility": [
            "FAA Auto™"
        ],
        "Sustainable Living": [
            "FAA™ Green Living"
        ],
        "Eco & Renewable Energy": [
            "FAA™ EcoPower"
        ]
    },
    "Singapore": {
        "Cloud Computing & AI Solutions": [
            "FAA Cloud"
        ],
        "Financial & Market Intelligence": [
            "FAA Index™", "FAA Invest™", "FAA Wealth™", "FAA Trade™"
        ]
    },
    "Hong Kong": {
        "Financial & Market Intelligence": [
            "FAA Index™", "FAA Invest™", "FAA Wealth™", "FAA Trade™"
        ]
    },
    "Switzerland": {
        "Financial & Market Intelligence": [
            "FAA Index™", "FAA Invest™", "FAA Wealth™", "FAA Trade™"
        ]
    },
    "Sweden": {
        "Telecommunications & IoT": [
            "FAA Connect™", "FAA IoT™", "FAA Fiber™"
        ]
    },
    "France": {
        "Financial Systems": [
            "FAA Financial Systems France"
        ],
        "Fashion": [
            "FAA Fashion France"
        ],
        "Luxury & Premium Markets": [
            "FAA Luxe™"
        ]
    },
    "Saudi Arabia": {
        "Automotive Solutions": [
            "FAA Automotive Solutions Saudi Arabia"
        ],
        "Cloud Computing": [
            "FAA Cloud Saudi Arabia"
        ],
        "Financial Systems": [
            "FAA Financial Systems Dubai (active in Saudi Arabia)"
        ]
    },
    "New Zealand": {
        "GreenTech": [
            "FAA GreenTech New Zealand"
        ]
    },
    "Middle East (General)": {
        "Digital Voice": [
            "FAA Digital Voice™"
        ]
    },
    "Latin America (General)": {
        "Consumer Electronics": [
            "FAA™ Electronics Marketplace"
        ],
        "Global Expansion": [
            "FAA Global Expansion™"
        ]
    },
    "Mahalapye (Botswana)": {
        "Logistics & Distribution": [
            "FAA™ Logistics & Distribution Hub", "FAA™ Smart Warehousing™", "FAA™ Global Freight™", "FAA™ Retail & Wholesale Nexus™"
        ],
        "Smart Commerce & Digital Retail": [
            "FAA™ Omni-Commerce™", "FAA™ Smart Marketplaces™", "FAA™ POS Systems™", "FAA™ Digital Payments Botswana™", "FAA™ Digital Spaza™", "FAA™ Cashless Trading™", "FAA™ Micro-Franchising™", "FAA™ Smart Commerce Labs™"
        ],
        "Agriculture & Sustainable Development": [
            "FAA™ Agricultural Commerce & Food Supply Chains", "FAA™ Baobab Growth Model™", "FAA™ Smart Farming Solutions™", "FAA™ Organic Market Botswana™"
        ],
        "Energy & Infrastructure Innovation": [
            "FAA™ Smart Power Botswana™", "FAA™ Solar Power Grid™", "FAA™ Electric Vehicle Charging Networks™", "FAA™ Water the Seed™ Infrastructure"
        ],
        "Informal Trade Governance": [
            "FAA™ Informal Trade Governance", "FAA™ IP-Free Trade Systems", "FAA™ Street Vendor Licensing", "FAA™ Township Economy Framework™"
        ],
        "Wholesale & Supply Chain Mastery": [
            "FAA™ Informal Logistics Hub", "FAA™ Township Warehousing™", "FAA™ Micro-Supply Franchising"
        ],
        "Future-Proof Economy (AI, Supply Chain & Digital Banking)": [
            "FAA™ AI Commerce Suite™", "FAA™ Digital Micro-Banking™", "FAA™ Atom-Level Compliance™"
        ]
    },
    "South America (General)": { // Renamed to avoid key conflict with specific Brazil entry
        "Eco & Renewable Energy": [
            "FAA™ EcoPower", "FAA™ Sustainable Home"
        ],
        "Consumer Electronics": [
            "FAA™ Electronics Marketplace"
        ],
        "Fitness & Wellness": [
            "FAA™ ActiveLife Products"
        ]
    },
    "Asia-Pacific (General)": {
        "Fitness & Wellness": [
            "FAA™ Wellness"
        ],
        "Baby & Kids Essentials": [
            "FAA™ Child Innovation"
        ],
        "Cloud Solutions": [
            "FAA Cloud Solutions™"
        ],
        "AI Systems": [
            "FAA AI Systems™"
        ],
        "Data Solutions": [
            "FAA Data Solutions™"
        ],
        "Global Expansion": [
            "FAA Global Expansion™"
        ]
    },
    "Russia": {
        "Atom-Level Verification": [
            "FAA™ Atom-Level Verification™ (ensuring data security and integrity)"
        ],
        "Business Practices": [
            "FAA™ System™ (transforming local businesses, secure blockchain transactions)"
        ]
    },
    "Brazil (General)": { // Renamed to avoid key conflict with specific Brazil entry
        "Business Expansion": [
            "FAA™ Ecosystem (empowering businesses to reach global markets)"
        ]
    },
    "Berlin (Germany)": {
        "Tech Startup": [
            "FAA™ Ecosystem (empowering tech startups)"
        ]
    },
    "Mumbai (India)": {
        "Enterprise": [
            "FAA™ Ecosystem (empowering small enterprises)"
        ]
    },
    "Paris (France)": {
        "Compliance & Security": [
            "FAA™ Atom-Level Verification™ (ensuring data security and integrity)"
        ]
    },
    "Lagos (Nigeria)": {
        "Small Business": [
            "FAA™ Ecosystem (supporting small businesses)"
        ]
    },
    "Nairobi (Kenya)": {
        "Markets": [
            "FAA™ (connecting vibrant markets)"
        ]
    },
    "Beijing (China)": {
        "Corporate Hubs": [
            "FAA™ (connecting corporate hubs)"
        ]
    },
    "Moscow (Russia)": {
        "Corporate Hubs": [
            "FAA™ (connecting corporate hubs)"
        ]
    },
    "Buenos Aires (Argentina)": {
        "Communities": [
            "FAA™ (connecting communities)"
        ]
    },
    "São Paulo (Brazil)": {
        "Industries": [
            "FAA™ Ecosystem (reshaping industries)"
        ]
    },
    "New York (USA)": {
        "Financial Hub": [
            "FAA™ (connecting to Wall Street, NYSE, Nasdaq)"
        ]
    },
    "Oceania (General)": {
        "Connections": [
            "FAA™ (creating connections between people, businesses, and cultures)"
        ]
    }
};

const countryToUrlMap = {
    "Australia": { continent: "oceania", country: "australia" },
    "Japan": { continent: "asia", country: "japan" },
    "South Africa": { continent: "africa", country: "south-africa" },
    "Africa (Pan-African Expansion)": { continent: "africa", country: "general" },
    "Dubai (UAE)": { continent: "middle-east", country: "uae" },
    "Global (General Application / Multiple Regions)": { continent: "global", country: "general" },
    "China": { continent: "asia", country: "china" },
    "India": { continent: "asia", country: "india" },
    "United Kingdom": { continent: "europe", country: "uk" },
    "United States": { continent: "north-america", country: "usa" },
    "Germany": { continent: "europe", country: "germany" },
    "Canada": { continent: "north-america", country: "canada" },
    "Brazil": { continent: "south-america", country: "brazil" },
    "Singapore": { continent: "asia", country: "singapore" },
    "Hong Kong": { continent: "asia", country: "hong-kong" },
    "Switzerland": { continent: "europe", country: "switzerland" },
    "Sweden": { continent: "europe", country: "sweden" },
    "France": { continent: "europe", country: "france" },
    "Saudi Arabia": { continent: "middle-east", country: "saudi-arabia" },
    "New Zealand": { continent: "oceania", country: "new-zealand" },
    "Middle East (General)": { continent: "middle-east", country: "general" },
    "Latin America (General)": { continent: "south-america", country: "general" },
    "Mahalapye (Botswana)": { continent: "africa", country: "botswana" },
    "South America (General)": { continent: "south-america", country: "general" },
    "Asia-Pacific (General)": { continent: "asia", country: "general" },
    "Russia": { continent: "europe", country: "russia" },
    "Brazil (General)": { continent: "south-america", country: "brazil-general" },
    "Berlin (Germany)": { continent: "europe", country: "germany" },
    "Mumbai (India)": { continent: "asia", country: "india" },
    "Paris (France)": { continent: "europe", country: "france" },
    "Lagos (Nigeria)": { continent: "africa", country: "nigeria" },
    "Nairobi (Kenya)": { continent: "africa", country: "kenya" },
    "Beijing (China)": { continent: "asia", country: "china" },
    "Moscow (Russia)": { continent: "europe", country: "russia" },
    "Buenos Aires (Argentina)": { continent: "south-america", country: "argentina" },
    "São Paulo (Brazil)": { continent: "south-america", country: "brazil" },
    "New York (USA)": { continent: "north-america", country: "usa" },
    "Oceania (General)": { continent: "oceania", country: "general" }
};


export const GlobalIndexView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [repoUrlsVisible, setRepoUrlsVisible] = useState(false);
    
    useEffect(() => {
        const initMap = () => {
            const mapElement = document.getElementById("map");
            if (mapElement && (window as any).google) {
                const worldCenter = { lat: 0, lng: 0 };
                const map = new (window as any).google.maps.Map(mapElement, {
                    zoom: 2,
                    center: worldCenter,
                });

                const markers = [
                    { lat: 36.966428, lng: -95.844032, title: "USA Brands" },
                    { lat: 54.633221, lng: -3.432277, title: "UK Brands" },
                    { lat: 34.668138, lng: 104.165802, title: "China Brands" },
                    { lat: -28.48322, lng: 24.676997, title: "South Africa Brands" },
                    { lat: -26.853388, lng: 133.275154, title: "Australia Brands" },
                    { lat: 62.393303, lng: -96.818145, title: "Canada Brands" },
                    { lat: 36, lng: 138, title: "Japan Brands" },
                    { lat: 21, lng: 78, title: "India Brands" },
                    { lat: 0.170945, lng: 37.903969, title: "Kenya Brands" },
                    { lat: -42, lng: 174, title: "New Zealand Brands" },
                    { lat: 46.232193, lng: 2.209667, title: "France Brands" },
                    { lat: 51.165707, lng: 10.452764, title: "Germany Brands" },
                    { lat: 25.276987, lng: 55.296249, title: "Dubai (UAE) Brands" },
                    { lat: -14.242915, lng: -53.189266, title: "Brazil Brands" },
                    { lat: 22.216667, lng: 114.166667, title: "Hong Kong Brands" },
                    { lat: -38.421295, lng: -63.587402, title: "Argentina Brands" },
                    { lat: -22.344029, lng: 24.680158, title: "Botswana Brands" },
                    { lat: -23.1, lng: 26.8, title: "Mahalapye (Botswana) Brands" },
                    { lat: 52.5200, lng: 13.4050, title: "Berlin (Germany) Brands" },
                    { lat: 19.0760, lng: 72.8777, title: "Mumbai (India) Brands" },
                    { lat: 48.8566, lng: 2.3522, title: "Paris (France) Brands" },
                    { lat: 6.5244, lng: 3.3792, title: "Lagos (Nigeria) Brands" },
                    { lat: -1.286389, lng: 36.817223, title: "Nairobi (Kenya) Brands" },
                    { lat: 39.9042, lng: 116.4074, title: "Beijing (China) Brands" },
                    { lat: 55.7558, lng: 37.6173, title: "Moscow (Russia) Brands" },
                    { lat: -34.6037, lng: -58.3816, title: "Buenos Aires (Argentina) Brands" },
                    { lat: -23.5505, lng: -46.6333, title: "São Paulo (Brazil) Brands" },
                    { lat: 9.0820, lng: 8.6753, title: "Nigeria Brands" },
                    { lat: 23.8859, lng: 45.0792, title: "Saudi Arabia Brands" },
                    { lat: 1.3521, lng: 103.8198, title: "Singapore Brands" },
                    { lat: 46.8182, lng: 8.2275, title: "Switzerland Brands" },
                    { lat: 60.1282, lng: 18.6435, title: "Sweden Brands" },
                    { lat: 61.5240, lng: 105.3188, title: "Russia Brands" },
                    { lat: -14.242915, lng: -53.189266, title: "South America Brands" },
                    { lat: 0.0, lng: 120.0, title: "Asia-Pacific Brands" },
                    { lat: 0.0, lng: 0.0, title: "Global Brands" }
                ];

                markers.forEach(markerData => {
                    new (window as any).google.maps.Marker({
                        position: { lat: markerData.lat, lng: markerData.lng },
                        map: map,
                        title: markerData.title,
                    });
                });
            }
        };

        (window as any).initMap = initMap;
    }, []);

    const filteredCountries = useMemo(() => {
        if (!searchTerm) return Object.entries(faaBrandData);

        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered: [string, any][] = [];

        for (const [country, sectors] of Object.entries(faaBrandData)) {
            const filteredSectors: [string, string[]][] = [];
            for (const [sector, brands] of Object.entries(sectors)) {
                const matchingBrands = brands.filter(brand => brand.toLowerCase().includes(lowerCaseSearchTerm));
                if (matchingBrands.length > 0) {
                    filteredSectors.push([sector, matchingBrands]);
                }
            }
            if (filteredSectors.length > 0) {
                filtered.push([country, Object.fromEntries(filteredSectors)]);
            }
        }
        return filtered;
    }, [searchTerm]);

    const slugify = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
            .replace(/™/g, '');
    }

    const generatedRepoUrls = useMemo(() => {
        return Object.entries(countryToUrlMap).map(([countryKey, urlParts]) => {
            const countryData = faaBrandData[countryKey as keyof typeof faaBrandData];
            if (!countryData || !urlParts) return null;
            
            const baseUrl = `${urlParts.continent}.${urlParts.country}.Faa.zone`;

            return (
                <div key={countryKey} className="repo-url-group mb-6">
                    <h4 className="text-xl font-semibold mb-3">{countryKey} URLs:</h4>
                    <ul className="repo-url-list">
                        {Object.entries(countryData).map(([sector, brands]) => {
                             const sectorSlug = slugify(sector);
                             const sectorCoreBrandsUrl = `${baseUrl}/sectors/${sectorSlug}core-brands}/index.html`;
                             return (
                                <React.Fragment key={sector}>
                                    <li>
                                        <strong>Sector Page (Core Brands):</strong> <a href={sectorCoreBrandsUrl} target="_blank" rel="noopener noreferrer">{sectorCoreBrandsUrl}</a>
                                    </li>
                                    {brands.map(brand => {
                                        const brandSlug = slugify(brand);
                                        const brandSubnodeUrl = `${baseUrl}/sectors/${sectorSlug}core-brands}/i${brandSlug}/index.html`;
                                        return (
                                            <li key={brand}>
                                                <strong>Brand Sub-node:</strong> <a href={brandSubnodeUrl} target="_blank" rel="noopener noreferrer">{brandSubnodeUrl}</a>
                                            </li>
                                        );
                                    })}
                                </React.Fragment>
                             )
                        })}
                    </ul>
                </div>
            )
        }).filter(Boolean);
    }, []);

    return (
        <div className="global-index-view animate-fade-in">
            <div className="container mx-auto main-card mt-8">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-blue-800 mb-10 leading-tight">
                    <span className="block">FAA™ Global Industry Index</span>
                    <span className="block text-blue-600 text-3xl lg:text-4xl mt-2">Brands by Country and Sector</span>
                </h1>
                <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-12">This index showcases the extensive reach of the FAA™ ecosystem, categorizing its 2500+ brands by their primary operational countries and specific industry sectors, reflecting the FAA™'s atom-level structuring and global expansion.</p>
                <div className="search-container">
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search for a brand..." />
                    <button onClick={() => setSearchTerm('')}>Clear</button>
                </div>
                <div>
                    {filteredCountries.map(([country, sectors]) => (
                        <div key={country} className="country-section">
                            <h2 className="country-title">{country}</h2>
                            {Object.entries(sectors).map(([sector, brands]) => (
                                <div key={sector} className="sector-group">
                                    <h3 className="sector-title">{sector}</h3>
                                    <ul className="brand-list">
                                        {(brands as string[]).map(brand => (
                                            <li key={brand} dangerouslySetInnerHTML={{ __html: searchTerm ? brand.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`) : brand }}></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="main-card mt-12">
                    <h2 className="text-3xl font-bold section-title cursor-pointer flex justify-between items-center" onClick={() => setRepoUrlsVisible(!repoUrlsVisible)}>
                        Repository URL Examples <span id="toggle-icon">{repoUrlsVisible ? '▲' : '▼'}</span>
                    </h2>
                    {repoUrlsVisible && (
                        <div id="repo-urls-content">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Below are examples of the repository URL structures for different sectors and brands, demonstrating the hierarchical organization within the FAA.Zone™.
                            </p>
                            <div>{generatedRepoUrls}</div>
                        </div>
                    )}
                </div>

                <div className="main-card mt-12">
                    <h2 className="text-3xl font-bold section-title">FAA™ Global Presence Map 🗺️</h2>
                    <div id="map"></div>
                </div>
            </div>
        </div>
    );
};

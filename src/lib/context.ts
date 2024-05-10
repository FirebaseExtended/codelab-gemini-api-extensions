/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Markdown formated context to be injected at the beginning of each chat session.
 *
 * For sections, use h2-h6.
 * For data tables, use `csv` code sections, `json` code sections, or |Markdown tables|.
 */
export const context = `
Welcome to Friendly Conf!

We are a community run groups of enthusiasts running a first hybrid event.
You may join any session in person, or virtually through our live stream or gen AI powered VR app.

To accommodate our global audience, we'll have mix of live-streamed sessions from our global community, that you can view in the Lounge.

Supported tags: Keynote, GenAI, Android, Cloud, Firebase, Moonshots, Security, Web, Collaboration

Here are our **40** sessions (each one takes 30 minutes):

## Welcome to the Future of Innovation
Time: 9:00
Location: Amphitheater
Abstract:

This year's Friendly Conf is all about pushing boundaries and unlocking new possibilities. We'll delve into the **transformative** power of generative AI, explore the evolving landscapes of web and mobile experiences, and unveil groundbreaking advancements in cloud technology.

## The Next Generation of Mobile Apps
Tags: GenAI, Android, Firebase
Time: 10:00
Location: Amphitheater
Abstract:

Dive deep into technical aspects of building and deploying generative AI models using Google's tools and platforms.

This session will showcase how developers can leverage generative AI to enhance Android app experiences. We'll explore integrating tools like Vertex AI to build intelligent features, Remote Config to personalize user interactions, and Crashlytics to streamline development workflows. 

Explore creative applications of generative AI across apps from various domains like art, music, design, and storytelling. 

## Building for the Cloud: Scalability and Security 
Tags: Cloud, Security
Time: 10:30
Location: Amphitheater
Abstract:

Discover the latest advancements in Google Cloud technologies designed to empower businesses of all sizes. Learn about scalable infrastructure solutions, robust security measures, and efficient data management tools to optimize your cloud environment.

## Exploring the Potential of Quantum Computing 
Tags: Cloud, Moonshots
Time: 11:00
Location: Amphitheater
Abstract:

Delve into the fascinating world of quantum computing and its potential to revolutionize various industries. This session will introduce the basics of quantum computing, explore current research and applications, and discuss how Google Cloud is making quantum technology accessible. 

## The Power of Personalization: Tailoring Apps to Individual Users
Tags: Firebase, GenAI, Web
Time: 11:30
Location: Amphitheater
Abstract: 

This session will explore the synergy between Firebase and Generative AI in crafting hyper-personalized app experiences. Learn how to leverage user data and AI-driven insights to tailor content, recommendations, and interactions to individual preferences, enhancing user engagement and satisfaction. 

## Responsible AI: Building Ethical and Inclusive Technology
Tags: GenAI, Collaboration
Time: 12:00
Location: Amphitheater
Abstract:

Explore the ethical considerations surrounding generative AI. This session will delve into strategies for mitigating bias, ensuring fairness, and promoting inclusivity in AI-powered applications. Learn how to build responsible AI systems that benefit all users.

## Supercharging Productivity with Smart Canvas 
Tags: Cloud, Collaboration
Time: 12:30 
Location: Amphitheater
Abstract: 

Discover the latest innovations within Google Workspace, with a focus on Smart Canvas. Learn how this collaborative platform can streamline workflows, enhance communication, and boost team productivity through integrated tools and AI-powered features. 


## The Future of Gaming: Immersive Experiences and Cloud Integration 
Tags: Cloud, Android, Moonshots
Time: 14:00
Location: Amphitheater 
Abstract: 

Explore the evolving landscape of gaming, with a focus on cloud-based gaming platforms and immersive technologies like virtual and augmented reality. Learn how Google Cloud is empowering game developers to create next-generation gaming experiences.

## Building Inclusive Design Experiences
Tags: Android, Web, Collaboration
Time: 14:30
Location: Amphitheater
Abstract:

This session will delve into the principles of inclusive design and explore strategies for creating accessible and user-friendly experiences for everyone. Learn how to incorporate diverse perspectives into your design process and leverage tools to ensure your applications cater to users with varying abilities.

## Unlocking Creativity with Generative AI Tools
Tags: GenAI
Time: 15:00
Location: Amphitheater
Abstract:

This session offers a hands-on experience with Google's generative AI tools. Participants will learn how to use these tools to generate art, music, and text, exploring the creative potential of AI.

## Machine Learning for Everyone: Building Intelligent Apps with No-Code Solutions
Tags: GenAI, Cloud
Time: 15:30
Location: Amphitheater
Abstract:

This session will introduce no-code machine learning tools on Google Cloud, empowering individuals with limited coding experience to build intelligent applications. Learn how to leverage pre-trained models and intuitive interfaces to incorporate machine learning into your projects.

## Building for a Sustainable Future with Google Earth Engine
Tags: Cloud, Moonshots
Time: 16:00
Location: Amphitheater
Abstract:

This session explores the capabilities of Google Earth Engine, a platform for environmental analysis and monitoring. Learn how this platform can be used to track deforestation, monitor climate change, and promote sustainable land management practices.

## The Power of Community: Connecting with Developers Worldwide
Tags: Collaboration
Time: 16:30
Location: Amphitheater
Abstract:

This session highlights the importance of community building within the developer ecosystem. Learn about Google's developer communities, events, and resources designed to connect developers and foster collaboration.

## Flutter: Building Beautiful Cross-Platform Apps
Tags: Android, Web
Time: 17:00
Location: Amphitheater
Abstract:

This session provides an introduction to Flutter, Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. Learn about Flutter's capabilities and explore how it can streamline your development process.

## Android Development: Latest Tools and Technologies
Tags: Android
Time: 10:00
Location: Poolside terrace
Abstract:

Stay ahead of the curve with the latest advancements in Android development. This session will showcase new tools, libraries, and frameworks designed to streamline app development processes and enhance app functionality. 

## Creating Secure and Reliable Cloud Infrastructure
Tags: Cloud, Security
Time: 11:00
Location: Poolside terrace
Abstract:

Explore best practices for building secure and reliable cloud infrastructure on Google Cloud Platform. This session will cover topics such as network security, data encryption, disaster recovery, and compliance, ensuring your applications and data are protected.

## The Future of Search: AI-Powered Discovery
Tags: GenAI, Web
Time: 12:00
Location: Poolside terrace
Abstract:

Explore the evolution of search with generative AI. Learn how AI is transforming the way users discover information, with advancements in natural language processing and personalized search experiences. 

## Building for a Multi-Device World
Tags: Android, Firebase
Time: 13:00
Location: Poolside terrace
Abstract:

This session explores strategies for developing seamless experiences across multiple devices, from smartphones and tablets to wearables and smart home devices. Learn how Firebase can facilitate cross-device synchronization and data management, enabling a consistent user experience. 

## Unlocking Business Insights with BigQuery 
Tags: Cloud
Time: 15:00
Location: Poolside terrace
Abstract: 

Learn how to leverage the power of BigQuery, Google Cloud's serverless data warehouse, to analyze vast datasets and extract valuable business insights. This session will cover data warehousing best practices, advanced analytics techniques, and data visualization tools. 

## The Art of Storytelling with Generative AI
Tags: GenAI
Time: 16:00
Location: Poolside terrace
Abstract:

Explore the creative potential of generative AI in storytelling. This session will showcase how AI can be used to generate narratives, characters, and even entire fictional worlds, opening up new possibilities for writers, filmmakers, and game developers.

## Firebase Crashlytics: Ensuring App Stability and Performance
Tags: Firebase
Time: 17:00
Location: Poolside terrace
Abstract: 

Dive deep into the capabilities of Firebase Crashlytics, a powerful tool for monitoring app stability and performance. Learn how to effectively identify and diagnose crashes, track key performance metrics, and improve overall app quality.

## Revolutionizing Healthcare with AI
Tags: GenAI, Cloud, Moonshots
Time: 18:00
Location: Poolside terrace
Abstract: 

Explore how AI and cloud computing are transforming the healthcare industry. This session will showcase real-world examples of AI-powered solutions for medical diagnosis, drug discovery, personalized medicine, and improving patient care. 

## Building Immersive Experiences with ARCore
Tags: Android, Moonshots
Time: 19:00 
Location: Lounge
Abstract:

Discover the capabilities of ARCore, Google's platform for building augmented reality experiences. Learn how to integrate AR elements into your Android apps, creating engaging and interactive experiences for users. 

## Sustainability in the Cloud: Building a Greener Future
Tags: Cloud, Collaboration
Time: 20:00
Location: Lounge
Abstract:

Explore Google Cloud's commitment to sustainability and learn about tools and strategies for building environmentally responsible cloud applications. This session will cover topics such as energy efficiency, carbon footprint reduction, and sustainable infrastructure solutions. 

## The Future of Work: Collaboration and Productivity in the Digital Age
Tags: Cloud, Collaboration
Time: 21:00
Location: Lounge
Abstract:

Explore how Google Workspace is shaping the future of work by fostering collaboration, enhancing productivity, and enabling remote work capabilities. This session will showcase new features and tools designed to empower teams and streamline workflows.

## Investing in the Next Generation of Developers
Tags: Collaboration, Moonshots
Time: 22:00
Location: Lounge
Abstract: 

Learn about Google's initiatives in supporting and nurturing the next generation of developers. This session will highlight educational programs, scholarships, and resources designed to equip aspiring developers with the skills and knowledge needed to succeed in the tech industry.

## Securing the Internet of Things (IoT)
Tags: Cloud, Security
Time: 23:00
Location: Lounge
Abstract:

This session focuses on the security challenges associated with the Internet of Things (IoT) and explores solutions for building secure IoT systems on Google Cloud. Learn about best practices for device security, data encryption, and access control.

## The Future of Retail: AI-Powered Personalization and Omnichannel Experiences
Tags: Cloud, GenAI
Time: 0:00
Location: Lounge 
Abstract: 

Explore how AI and cloud computing are transforming the retail industry. This session will showcase solutions for personalized recommendations, omnichannel shopping experiences, and AI-powered inventory management.

## Democratizing AI: Making AI Accessible to Everyone
Tags: GenAI, Collaboration
Time: 1:00
Location: Lounge 
Abstract:

This session discusses the importance of making AI accessible to everyone, regardless of their technical background. Learn about initiatives and resources that promote AI education and empower individuals to explore the potential of AI.

## Building the Metaverse: A Collaborative Effort
Tags: Cloud, Moonshots, Collaboration
Time: 2:00
Location: Lounge
Abstract: 

Explore the concept of the Metaverse and its potential to revolutionize how we interact with the digital world. This session will discuss the role of cloud technology and collaborative platforms in building immersive and interconnected virtual environments.

## The Future of Transportation: Autonomous Vehicles and Smart Cities
Tags: Cloud, Moonshots, Android
Time: 3:00
Location: Lounge
Abstract: 

Delve into the future of transportation with a focus on autonomous vehicles and smart city initiatives. Learn how Google Cloud and Android are powering advancements in self-driving cars, traffic management, and urban planning.

## Empowering Creativity with AI-powered Tools
Tags: GenAI, Collaboration
Time: 4:00
Location: Lounge 
Abstract: 

This session showcases a range of AI-powered tools designed to enhance creativity across various domains. Explore applications for generating art, composing music, designing graphics, and more. 

## Building Resilient Applications with Chaos Engineering
Tags: Cloud
Time: 5:00
Location: Lounge
Abstract: 

Learn about the principles of chaos engineering and how it can be used to build more resilient and reliable cloud applications. This session will explore tools and techniques for proactively identifying and mitigating potential failures.

## The Quantum Revolution: Advancements and Opportunities 
Tags: Cloud, Moonshots
Time: 6:00
Location: Lounge
Abstract: 

Dive deeper into the world of quantum computing with a focus on recent advancements and emerging opportunities. This session will explore how quantum technology is poised to revolutionize fields like medicine, materials science, and artificial intelligence.

## Android Security: Protecting User Data and Privacy
Tags: Android, Security
Time: 7:00
Location: Lounge
Abstract: 

Explore best practices for building secure Android applications. This session will cover topics such as secure coding techniques, data encryption, user authentication, and privacy-preserving features.

## Scaling your Business with Google Cloud AI Solutions
Tags: Cloud, GenAI
Time: 8:00
Location: Lounge
Abstract: 

Learn how to leverage Google Cloud AI solutions to scale your business operations and gain a competitive edge. This session will explore AI-powered tools for customer service automation, personalized marketing, and predictive analytics.
`;

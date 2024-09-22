# IG Reels Upload Flow 
This project demonstrates how to build a large-scale Instagram Reels-style video upload and processing system. The system includes an API for video uploads, Kafka for managing processing queues, FFmpeg for video encoding, and MongoDB for storing metadata.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Reels Upload Flow](#reels-upload-flow)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)

## Introduction

This system is designed to handle large video uploads by decoupling the upload and processing tasks through Kafka. The Node.js backend API receives the video, queues it for processing, and encodes it using FFmpeg. The processed video metadata is stored in MongoDB, and users can be optionally notified when the video is ready via WebSocket or polling.

## Technologies Used

- **Node.js**: Backend server and API framework
- **Express**: Web framework for handling HTTP requests
- **Kafka**: Message broker to handle video processing asynchronously
- **FFmpeg**: Video encoding and processing tool
- **MongoDB**: Database to store video metadata (file path, user, etc.)
- **Multer**: Middleware for handling file uploads
- **Kafka-node**: Kafka client library for Node.js
- **WebSocket (Optional)**: For notifying users when processing is complete

## Reels Upload Flow

Here’s an overview of the video upload and processing flow:

1. **User Uploads Reel Video**: The user submits a video file via a POST request to the Node.js API.
   - The API receives the file using Multer middleware.

2. **Send Video Metadata to Kafka**: The video file path and metadata (e.g., user ID, file name) are sent to a Kafka topic, ensuring the system can handle high throughput by decoupling the video upload and encoding processes.

3. **Kafka Consumer Processes the Video**: The Kafka consumer service listens to the Kafka topic, retrieves the video metadata, and triggers the video encoding process.

4. **Encode Video**: The video is resized and encoded using FFmpeg into a format suitable for Instagram Reels (e.g., MP4 with a resolution of 1080x1920).

5. **Store Metadata in MongoDB**: Once the encoding process is complete, the metadata (such as the encoded video path and upload details) is stored in MongoDB.

6. **Notify Client (Optional)**: You can notify the user when the video is ready by either using WebSocket or having the client poll the server to check the status of the video processing.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Kafka broker running (with Zookeeper)
- MongoDB instance
- FFmpeg installed on the server

### Installation

1. Clone the express typescript with repo-pattern starter repository:
    ```bash
    git clone https://github.com/lamaparbat/repository-pattern-ts-express.git
    cd reels-upload-flow
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start Kafka and Zookeeper (if not already running). Example using Docker:
    ```bash
    docker-compose up -d
    ```

4. Set up MongoDB and ensure it is running locally or via a cloud provider.

### Running the Project

1. **Start the Node.js server**:
    ```bash
    npm start
    ```

2. **Run the Kafka consumer (for video processing)**:
    ```bash
    node kafkaConsumer.js
    ```


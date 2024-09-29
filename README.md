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

2. **Process the Video Using Kafka:**:
   - Once the video is uploaded, the reel file is sent to a Kafka topic for encoding using FFmpeg.
   - Kafka will decouple the uploading process from the encoding process to handle large-scale processing efficiently.
     
4. **FFmpeg Encoding:**:
   - A separate Kafka consumer service listens for new video files.
   - Upon receiving a video file, FFmpeg processes the video (e.g., transcodes to a different format, resolution, etc.).

6. **Upload to S3**:
   - Once the encoding is completed, the encoded video file is uploaded to Amazon S3.
   - A new S3 file path is generated for the encoded video.

8. **Return Response:**:
   - Once the file is successfully uploaded to S3, a response is sent to the client with the S3 URL of the encoded video.


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


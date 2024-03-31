import numpy as np
import mediapipe as mp
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(static_image_mode=False)

# Global variables to store landmark sequences
user_landmarks_sequence = []
benchmark_landmarks_sequence = []


def get_landmarks(pose_results):
    """Extract landmark points from pose results."""
    landmarks = [(lm.x, lm.y) for lm in pose_results.pose_landmarks.landmark]
    return landmarks


def get_dtw_graphs(image_user, image_benchmark):
    global user_landmarks_sequence, benchmark_landmarks_sequence

    # Process both user and benchmark images with MediaPipe
    results_user = pose.process(image_user)
    results_benchmark = pose.process(image_benchmark)

    if results_user.pose_landmarks and results_benchmark.pose_landmarks:
        # Extract landmarks
        user_landmarks = get_landmarks(results_user)
        benchmark_landmarks = get_landmarks(results_benchmark)

        # Append landmarks to their respective sequences
        user_landmarks_sequence.append(user_landmarks)
        benchmark_landmarks_sequence.append(benchmark_landmarks)

        # Use fastdtw to calculate the Dynamic Time Warping distance
        distance, path = fastdtw(
            user_landmarks_sequence, benchmark_landmarks_sequence, dist=euclidean
        )

        # Feedback based on DTW distance
        # Note: Specific feedback logic (e.g., thresholds for 'faster' or 'slower') depends on your application's needs
        print(f"DTW Distance: {distance}")
        # Here, implement your logic to determine if the user is moving faster or slower compared to the benchmark.
    else:
        print("No landmarks detected in one of the images.")

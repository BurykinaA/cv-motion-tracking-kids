import mediapipe as mp
import numpy as np

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils
pose = mp_pose.Pose(static_image_mode=False)

total_frames = 0
correct_steps = 0



def cosine_distance(landmarks1, landmarks2):
    if landmarks1 and landmarks2:
        points1 = np.array([(lm.x, lm.y, lm.z) for lm in [landmarks1]])
        points2 = np.array([(lm.x, lm.y, lm.z) for lm in [landmarks2]])
        dot_product = np.dot(points1.flatten(), points2.flatten())
        norm_product = np.linalg.norm(points1.flatten()) * np.linalg.norm(
            points2.flatten()
        )
        similarity = dot_product / norm_product
        return 1 - similarity
    else:
        return 1


def detect_and_correct_errors(results_user, results_benchmark, threshold=0.5):
    errors = []

    # Legs
    left_knee_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_KNEE
    ]
    left_knee_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_KNEE
    ]
    right_knee_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_KNEE
    ]
    right_knee_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_KNEE
    ]

    knee_distance_user = cosine_distance(left_knee_user, left_knee_benchmark)
    knee_distance_benchmark = cosine_distance(right_knee_user, right_knee_benchmark)

    if (
        knee_distance_user * 100 < threshold
        or knee_distance_benchmark * 100 < threshold
    ):
        errors.append("Неправильное расположение колен")

    # Arms
    left_elbow_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_ELBOW
    ]
    left_elbow_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_ELBOW
    ]
    right_elbow_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_ELBOW
    ]
    right_elbow_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_ELBOW
    ]

    elbow_distance_user = cosine_distance(left_elbow_user, left_elbow_benchmark)
    elbow_distance_benchmark = cosine_distance(right_elbow_user, right_elbow_benchmark)

    if (
        elbow_distance_user * 100 < threshold
        or elbow_distance_benchmark * 100 < threshold
    ):
        errors.append("Неправильное расположение рук")

    # Torso
    left_shoulder_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_SHOULDER
    ]
    left_shoulder_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.LEFT_SHOULDER
    ]
    right_shoulder_user = results_user.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_SHOULDER
    ]
    right_shoulder_benchmark = results_benchmark.pose_landmarks.landmark[
        mp_pose.PoseLandmark.RIGHT_SHOULDER
    ]

    shoulder_distance_user = cosine_distance(
        left_shoulder_user, left_shoulder_benchmark
    )
    shoulder_distance_benchmark = cosine_distance(
        right_shoulder_user, right_shoulder_benchmark
    )

    if (
        shoulder_distance_user * 100 < threshold
        or shoulder_distance_benchmark * 100 < threshold
    ):
        errors.append("Неправильное расположение туловища")

    return errors


def get_poses(image_user, image_benchmark):
    global total_frames
    global correct_steps
    
    total_frames += 1

    results_user = pose.process(image_user)
    results_benchmark = pose.process(image_benchmark)

    errors = detect_and_correct_errors(results_user, results_benchmark)

    correct_step = True if len(errors) == 0 else False
    correct_steps += correct_step

    percent = (correct_steps / (total_frames)) * 100

    percent = "{:.2f}".format(percent)

    return {
        "Frame_Error": "".join(errors),
        "Step": "CORRECT STEP" if correct_step else "WRONG STEP",
        "Cumulative_Accuracy": f"{percent} %",
    }

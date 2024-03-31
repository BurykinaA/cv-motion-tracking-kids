import numpy as np
import matplotlib.pyplot as plt
from matplotlib import gridspec
from fastdtw import fastdtw
from scipy.spatial.distance import euclidean
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def image_to_base64(path):
    with open(path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string


def get_pca_graph(user_landmarks_sequence, benchmark_landmarks_sequence):
    # Ваш код для PCA и нормализации данных
    all_landmarks = np.array(user_landmarks_sequence + benchmark_landmarks_sequence)
    n_samples, n_landmarks, _ = all_landmarks.shape
    all_landmarks_flattened = all_landmarks.reshape((n_samples, -1))
    scaler = StandardScaler()
    all_landmarks_normalized = scaler.fit_transform(all_landmarks_flattened)
    pca = PCA(n_components=1)
    reduced_landmarks = pca.fit_transform(all_landmarks_normalized)
    user_reduced = reduced_landmarks[: len(user_landmarks_sequence)]
    benchmark_reduced = reduced_landmarks[len(user_landmarks_sequence) :]

    # Расчет DTW
    distance, path = fastdtw(user_reduced, benchmark_reduced, dist=euclidean)
    path = np.array(path)

    # Построение соотношения временных рядов
    plt.figure(figsize=(10, 6))
    plt.plot(user_reduced, label="User", marker="o")
    plt.plot(benchmark_reduced, label="Benchmark", marker="x")
    for (i, j) in path:
        plt.plot([i, j], [user_reduced[i], benchmark_reduced[j]], "r")
    plt.legend()
    plt.xlabel("Time Step")
    plt.ylabel("Reduced Dimension Value")
    plt.title(f"DTW Alignment (Distance: {distance:.2f})")
    plt.grid(True)
    plt.savefig("dtw_alignment.png")

        
    fig_matrix = plt.figure(figsize=(10, 10))
    gs = gridspec.GridSpec(2, 2, width_ratios=[1, 4], height_ratios=[4, 1])

    # Рисуем график user_reduced слева
    plt.subplot(gs[0])
    plt.plot(user_reduced, range(len(user_reduced)), 'b')
    plt.gca().invert_yaxis()
    plt.gca().xaxis.tick_top()
    plt.ylabel('Time Series A')

    # Рисуем график benchmark_reduced снизу
    plt.subplot(gs[3])
    plt.plot(range(len(benchmark_reduced)), benchmark_reduced, 'g')
    plt.xlabel('Time Series B')

    # Рисуем матрицу расстояний и путь DTW по центру
    plt.subplot(gs[1])
    distance_matrix = np.zeros((len(user_reduced), len(benchmark_reduced)))
    for i in range(len(user_reduced)):
        for j in range(len(benchmark_reduced)):
            distance_matrix[i, j] = euclidean(user_reduced[i], benchmark_reduced[j])
    plt.imshow(distance_matrix, aspect='auto', origin='lower', cmap='gray_r', interpolation='none')
    plt.clim(vmin=0, vmax=np.max(distance_matrix))

    # Рисуем путь DTW поверх матрицы расстояний
    plt.plot(path[:, 1], path[:, 0], 'r')
    plt.title(f'DTW total distance = {distance:.2f}')

    # Убираем оси на центральном графике
    plt.axis('off')

    # Отображаем график
    plt.tight_layout()
    plt.savefig("distance.png")

    return image_to_base64("app/dtw_alignment.png"), image_to_base64("app/distance.png")

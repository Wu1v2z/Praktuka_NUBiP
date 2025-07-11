#include <stdio.h>

// Функція для знаходження найбільшого спільного дільника (nsd)
int nsd(int a, int b) {
    while (b != 0) {
        int temp = a % b;
        a = b;
        b = temp;
    }
    return a;
}

// Функція для знаходження найменшого спільного кратного (nsk)
int nsk(int a, int b) {
    return (a * b) / nsd(a, b);
}

int main() {
    int k, i;
    int a[20];

    printf("Введіть кількість чисел (наприклад: 3), потім самі числа (наприклад: 2 9 3):\n");

    scanf("%d", &k);

    printf("Введіть %d чисел:\n", k);
    for (i = 0; i < k; i++) {
        scanf("%d", &a[i]);
    }

    // Обчислення НСК
    int result = a[0];
    for (i = 1; i < k; i++) {
        result = nsk(result, a[i]);
    }

    printf("Найменше спільне кратне: %d\n", result);

    return 0;
}

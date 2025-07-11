#include <stdio.h>
#include <math.h> // Для sqrt() і pow()

int main() {
    int x1, y1, x2, y2;
    double length;

    // Ввід координат
    printf("Введіть координати x1, y1, x2, y2: ");
    scanf("%d %d %d %d", &x1, &y1, &x2, &y2);

    // Обчислення довжини вектора
    length = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

    // Вивід результату з точністю до 6 знаків
    printf("%.6lf\n", length);

    return 0;
}


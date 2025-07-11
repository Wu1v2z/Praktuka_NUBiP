#include <stdio.h>
#include <math.h>

int main() {
    int x1, y1, r1, x2, y2, r2;
    double d;

    // Ввід
    printf("Введіть x1 y1 r1 x2 y2 r2: ");
    scanf("%d %d %d %d %d %d", &x1, &y1, &r1, &x2, &y2, &r2);

    // Відстань між центрами
    d = sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1));

    // Визначення кількості точок перетину
    if (x1 == x2 && y1 == y2 && r1 == r2) {
        printf("-1\n"); // нескінченно багато точок
    } else if (d > r1 + r2 || d < fabs(r1 - r2)) {
        printf("0\n"); // не перетинаються
    } else if (fabs(d - (r1 + r2)) < 1e-6 || fabs(d - fabs(r1 - r2)) < 1e-6) {
        printf("1\n"); // дотикаються
    } else {
        printf("2\n"); // перетинаються в двох точках
    }

    return 0;
}

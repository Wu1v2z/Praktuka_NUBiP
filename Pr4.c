#include <stdio.h>

int main() {
    int n, i, count = 0;

    printf("Введіть натуральне число n: ");
    scanf("%d", &n);

    // Перевіряємо всі можливі m від 1 до n-1
    for (i = 1; i < n; i++) {
        if (n / i == n % i) {
            count++;
        }
    }

    printf("Кількість рівних дільників числа %d: %d\n", n, count);

    return 0;
}


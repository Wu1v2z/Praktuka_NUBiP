#include <stdio.h>
#include <string.h>

// Функція для обчислення факторіала
long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    char word[15]; // Слово не більше 14 символів
    int freq[256] = {0}; // Частота кожної літери

    printf("Введіть слово: ");
    scanf("%s", word);

    int len = strlen(word);

    // Порахуємо скільки разів зустрічається кожна літера
    for (int i = 0; i < len; i++) {
        char ch = word[i];
        freq[(unsigned char)ch]++;
    }

    // Формула: N! / (f1! * f2! * ... * fk!)
    long long total = factorial(len);

    for (int i = 0; i < 256; i++) {
        if (freq[i] > 1) {
            total /= factorial(freq[i]);
        }
    }

    printf("Кількість анаграм: %lld\n", total);

    return 0;
}

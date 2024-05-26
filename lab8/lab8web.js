class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    get countedSalary() {
        let salary = this.baseSalary;

        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary += 200;
        }

        return salary;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    get countedSalary() {
        return super.countedSalary * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    get countedSalary() {
        let salary = super.countedSalary;

        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }

        const developersCount = this.team.filter(member => member instanceof Developer).length;
        if (developersCount > this.team.length / 2) {
            salary *= 1.1;
        }

        return salary;
    }
}

class Developer extends Employee {
    
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = this.managers.flatMap(manager => [manager, ...manager.team]);

        let output = '';
        allEmployees.forEach(employee => {
            output += `${employee.getFullName()} отримав ${employee.countedSalary.toFixed(2)} шекелів\n`;
        });

        return output;
    }
}

// Приклади використання
const dev1 = new Developer('Oleksandr', 'Mazur', 1000, 3);
const dev2 = new Developer('Nikola', 'Sullo', 1500, 6);
const designer1 = new Designer('Mark', 'Dashevskiy', 1200, 4, 0.9);
const manager1 = new Manager('Olga', 'Kalus', 2000, 8, [dev1, dev2, designer1]);

const department = new Department([manager1]);

// Додавання обробника подій до кнопки
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('calculateSalaries');
    const output = document.getElementById('salaryOutput');

    button.addEventListener('click', function () {
        output.textContent = department.giveSalary();
    });
});

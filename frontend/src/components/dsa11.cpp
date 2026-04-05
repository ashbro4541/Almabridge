#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cstdlib>
using namespace std;
struct Student {
int rollNo;
string name;
string division;
string address;
};
string studentToString(const Student &s) {
ostringstream oss;
oss << s.rollNo << " " << s.name << " " << s.division << " " << s.address;
return oss.str();
}
bool stringToStudent(const string &str, Student &s) {
istringstream iss(str);
if (!(iss >> s.rollNo >> s.name >> s.division >> s.address)) {
return false;
}
return true;
}
void addStudent(const string &filename) {
Student s;
cout << "Enter Roll Number: ";
cin >> s.rollNo;
cout << "Enter Name (no spaces, or use underscore _ for spaces): ";
cin >> s.name;
cout << "Enter Division: ";
cin >> s.division;
cout << "Enter Address (no spaces, or use underscore _ for spaces): ";
cin >> s.address;
ofstream ofs(filename, ios::app);
if (!ofs) {
cerr << "Error opening file for writing." << endl;
return;
}
ofs << studentToString(s) << "\n";
ofs.close();
cout << "Student added successfully." << endl;
}
void displayStudent(const string &filename) {
int roll;
cout << "Enter Roll Number of student to display: ";
cin >> roll;
ifstream ifs(filename);
if (!ifs) {
cerr << "Error opening file for reading." << endl;
return;
}
bool found = false;
string line;
while (getline(ifs, line)) {
Student s;
if(stringToStudent(line, s) && s.rollNo == roll) {
cout << "Student Details:" << endl;
cout << "Roll Number: " << s.rollNo << "\nName: " << s.name 
<< "\nDivision: " << s.division << "\nAddress: " << s.address << endl;
found = true;
break;
}
}
ifs.close();
if (!found) {
cout << "Student with roll number " << roll << " does not exist." << endl;
}
}
void deleteStudent(const string &filename) {
int roll;
cout << "Enter Roll Number of student to delete: ";
cin >> roll;
ifstream ifs(filename);
if (!ifs) {
cerr << "Error opening file for reading." << endl;
return;
}
vector<string> records;
bool found = false;
string line;
while(getline(ifs, line)){
Student s;
if (stringToStudent(line, s)) {
if(s.rollNo == roll) {
found = true;
continue;
}
}
records.push_back(line);
}
ifs.close();
if (!found) {
cout << "Student with roll number " << roll << " does not exist." << endl;
return;
}
ofstream ofs(filename);
if(!ofs) {
cerr << "Error opening file for writing." << endl;
return;
}
for(const auto& rec : records) {
ofs << rec << "\n";
}
ofs.close();
cout << "Student record deleted successfully." << endl;
}
int main() {
const string filename = "student.txt";
int choice;

do {
cout << "\n--- Student Information System ---" << endl;
cout << "1. Add Student" << endl;
cout << "2. Delete Student" << endl;
cout << "3. Display Student" << endl;
cout << "4. Exit" << endl;
cout << "Enter your choice: ";
cin >> choice;
switch(choice) {
case 1:
addStudent(filename);
break;
case 2:
deleteStudent(filename);
break;
case 3:
displayStudent(filename);
break;
case 4:
cout << "Exiting program." << endl;
break;
default:
cout << "Invalid choice. Please try again." << endl;
}
} while(choice != 4);
return 0;
}
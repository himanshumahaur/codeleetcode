const db = {
    2490: {
        problem: `Circular Sentence`,
        code:`class Solution {
public:
bool isCircularSentence(string str) {
for(int i=0; i<str.length(); i++)  if(str[i]==' ' && str[i-1] != str[i+1]) return false;
if(str[0]!=str[str.length()-1]) return false;
return true;
}
};`
    },
    1957: {
        problem: `Delete Characters to Make Fancy String`,
        code: `class Solution {
public:
string makeFancyString(string s) {
char prev = ' ';

int count = 0;
string res;

for(auto i:s) {
    if(i==prev) {
        count++;
        if(count > 1) continue;
        else res += i;
    }
    else {
        prev = i;
        count = 0;

        res += i;
    }
}

return res;
}
};`},
    786: {
        problem: `Rotate String`,
        code: `class Solution {
public:
    bool rotateString(string s, string goal) {
        if(s.length() != goal.length()) return false;

        for(int idx = 0; idx < goal.length(); idx++) {
            bool res = true;
            int x = 0;
            for(int j=idx; j<goal.length(); j++) {
                if(s[j]!=goal[x]) res = false;
                x++;
            }
            for(int i=0; i<idx; i++) {
                if(s[i]!=goal[x]) res = false;
                x++;
            }
            if(res) return res;
        }

        return false;
    }
};`
    },
    3163: {
        problem: `String Compression III`,
        code:  `class Solution {
public:
    string compressedString(string word) {
        string res;
        for(int i=0; i<word.length(); i++) {
            int j = i;
            while(word[i]==word[j] && i-j<9) i++;
            res += to_string(i-j) + word[j];
            i--;
        }
        return res;
    }
};`
    }
}
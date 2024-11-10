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
    },
    2914: {
        problem: `Minimum Number of Changes to Make Binary String Beautiful`,
        code:  `class Solution {
public:
    int minChanges(string s) {
        int ops = 0;
        for(int i=0; i<s.length(); i+=2) if(s[i] != s[i+1]) ops += 1;
        return ops;
    }
};`
    },
    3011: {
        problem: `Find if Array Can Be Sorted`,
        code:  `class Solution {
public:
    int count(int num) {
        int count = 0;
        while(num) {
            if(num%2) count++;
            num /= 2;
        }
        return count;
    }

    bool canSortArray(vector<int>& nums) {
        vector<int> bina;
        for(auto num:nums) bina.push_back(count(num));

        for(int i=0; i<nums.size(); i++) {
            for(int j=0; j<nums.size()-1; j++) {
                if(bina[j]==bina[j+1] && nums[j] > nums[j+1]) {
                    int t1 = nums[j];
                    int t2 = bina[j];
                    nums[j] = nums[j+1];
                    bina[j] = bina[j+1];
                    nums[j+1] = t1;
                    bina[j+1] = t2;
                }
            }
        }

        for(int i=0; i<nums.size()-1; i++) if(nums[i] > nums[i+1]) return false;

        return true;
    }
};`
    },
    2275: {
        problem: `Largest Combination With Bitwise AND Greater Than Zero`,
        code:  `class Solution {
public:
    void fill(vector<int> &mem, int num) {
        int idx = 0;
        while(num) {
            if(num & 1) mem[idx]++;
            num >>= 1; 
            idx++;
        }
    }

    int largestCombination(vector<int>& candidates) {
        vector<int> mem(40);

        for(auto i:candidates) fill(mem, i);
        
        int res = 0;
        for(auto i:mem) res = max(res, i);
        return res;
    }
};`
    },
    1829: {
        problem: `Maximum XOR for Each Query`,
        code:  `class Solution {
public:
    vector<int> getMaximumXor(vector<int>& nums, int maxBit) {
        vector<int> result;

        int cxor = nums[0];
        int n = nums.size();
        int idx = n;

        for(int i=1; i<n; i++) cxor ^= nums[i];

        for(int i=0; i<n; i++) {
            int val = 0;   
            int bit = 0;
            int cur = cxor;   

            while(bit < maxBit) {
                if(cur%2==0 || cur==0) {
                    val += pow(2, bit);
                }
                cur /= 2;
                bit++;
            }

            result.push_back(val);

            idx--;
            cxor ^= nums[idx];
        }

        return result;
    }
};`
    },
    3133: {
        problem: `Minimum Array End`,
        code:  `class Solution {
public:
    long long minEnd(int x, int n) {
        long long res = 0;
        int idx = 0;

        x--;

        while(n || x) {
            if(n && x) {
                if(n&1) {
                    res += pow(2, idx);
                }
                else {
                    if(x&1) res += pow(2, idx);
                    x >>= 1;
                }
                n >>= 1;
            }
            else if(n) {
                if(n&1) res += pow(2, idx);
                n >>= 1;
            }
            else if(x) {
                if(x&1) res += pow(2, idx);
                x >>= 1;
            }
            idx++;
        }

        return res;
    }
};`
    },
    3097: {
        problem: `Shortest Subarray With OR at Least K II`,
        code:  `class Solution {
public:
    void add(vector<int> &vec, int num) {
        int idx = 0;
        while(num) {
            vec[idx] += num%2;
            num /= 2;
            idx++;
        }
    }

    void sub(vector<int> &vec, int num) {
        int idx = 0;
        while(num) {
            vec[idx] -= num%2;
            num /= 2;
            idx++;
        }
    }

    int gnv(vector<int> &vec) {
        int num = 0;
        for(int i=0; i<32; i++) if(vec[i]) num += pow(2, i);
        return num;
    }

    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();
        int r = INT_MAX;

        vector<int> vec(32);

        int p = 0;

        for(int i=0; i<n; i++) {
            add(vec, nums[i]);

            while(p <= i && gnv(vec) >= k) {
                sub(vec, nums[p]);
                r = min(r, i-p+1);
                p++;
            }
        }

        if(r==INT_MAX) return -1;
        return r;
    }
};`
    },
    0: {
        problem: ``,
        code:  ``
    },
    0: {
        problem: ``,
        code:  ``
    },
    0: {
        problem: ``,
        code:  ``
    },
    
}
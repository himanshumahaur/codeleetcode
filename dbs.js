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
    2601: {
        problem: `Prime Subtraction Operation`,
        code:  `class Solution {
public:
    bool primeSubOperation(vector<int>& nums) {
        int n = nums.size();

        vector<int> primes;

        for(int i=2; i<1000; i++) {
            bool p = true;
            for(int j=2; j<=sqrt(i); j++) {
                if(i%j==0) p = false;
                if(!p) break;
            }
            if(p) primes.push_back(i);
        }

        for(int i=n-2; i>=0; i--) {
            for(auto p:primes) {
                if(nums[i] < nums[i+1]) break;
                if(p>=nums[i]) break;
                if(nums[i]-p < nums[i+1]) {
                    nums[i] -= p;
                    break;
                }
            }
            if(nums[i]>=nums[i+1]) return false;
        }

        return true;
    }
};`
    },
    2070: {
        problem: `Most Beautiful Item for Each Query`,
        code:  `class Solution {
public:
    static bool cmp(vector<int> &a, vector<int> &b) {
        return a[0] < b[0];
    }

    vector<int> maximumBeauty(vector<vector<int>>& items, vector<int>& queries) {
        int maxBeauty = INT_MIN;
        vector<int> vec;
        vector<int> nec;
        sort(items.begin(), items.end(), cmp);

        for(int i=0; i<items.size(); i++) {
            int price = items[i][0];
            int beauty = items[i][1];

            if(vec.size()) {
                int idx = vec.size()-1;
                if(vec[idx]!=price) {
                    vec.push_back(price);
                    nec.push_back(max(nec[idx], beauty));
                }
                else {
                    nec[idx] = max(beauty, nec[idx]);
                }
            }
            else {
                vec.push_back(price);
                nec.push_back(beauty);
            }
        }
        
        vector<int> result;

        for(auto query:queries) {
            if(query < vec[0])  {
                result.push_back(0);
            }
            else {
                auto itr = lower_bound(vec.begin(), vec.end(), query);

                int idx = itr - vec.begin();
                if(itr==vec.end() || *itr!=query) idx--;
                result.push_back(nec[idx]);
            }
        }

        return result;
    }
};`
    },
    2563: {
        problem: `Count the Number of Fair Pairs`,
        code:  `---`
    },
    1574: {
        problem: `Shortest Subarray to be Removed to Make Array Sorted`,
        code:  `class Solution {
public:
    int findLengthOfShortestSubarray(vector<int>& arr) {
        int n = arr.size();
        int p1 = -1;
        int p2 = n;

        int tmp;
        
        tmp = arr[0];
        for(int i=0; i<n; i++) {
            if(arr[i] >= tmp) {
                p1++;
                tmp  = arr[i];
            }
            else break;
        }

        tmp = arr[n-1];
        for(int i=0; i<n; i++) {
            if(arr[n-1-i] <= tmp) {
                p2--;
                tmp  = arr[n-1-i];
            }
            else break;
        }

        int res = INT_MAX;

        if(p1 > -1 && p2 < n) {
            for(int i=0; i<=p1; i++) {
                auto itr = lower_bound(arr.begin() + p2, arr.end(), arr[i]);
                if(itr!=arr.end()) {
                    int x = itr - arr.begin() - i - 1;
                    res = min(res, x);
                }
            }
        }

        if(res<0) return 0;
        return min(res, min(n - p1 - 1, p2));
    }
};`
    },
    3254: {
        problem: `Find the Power of K-Size Subarrays I`,
        code:  `class Solution {
public:
    vector<int> resultsArray(vector<int>& nums, int k) {
        if(k==1) return nums;

        map<int, bool> error;
        int tmp = nums[0] - 1;

        vector<int> res;

        for(int i=0; i<k; i++) {
            if(nums[i] != tmp + 1) error[i-1] = true;
            tmp = nums[i];
        }

        if(error.size()) res.push_back(-1);
        else res.push_back(nums[k-1]);

        for(int i=k; i<nums.size(); i++) {
            error.erase(i-k);
            if(nums[i] != tmp + 1) error[i-1] = true;

            if(error.size()) res.push_back(-1);
            else res.push_back(nums[i]);
        
            tmp = nums[i];
        }

        return res;
    }
};`
    },
    1652: {
        problem: `Defuse the Bomb`,
        code:  `class Solution {
public:
    vector<int> decrypt(vector<int>& code, int k) {
        int n = code.size();
        vector<int> res(n);
        
        if(k>0) {
            for(int i=0; i<n; i++) {
                int idx = i+1;
                int sum = 0;
                for(int j=0; j<k; j++) {
                    idx %= n;
                    sum += code[idx];
                    idx++;
                }
                res[i] = sum;
            }
        }

        if(k<0) {
            for(int i=0; i<n; i++) {
                int idx = i-1;
                int sum = 0;
                for(int j=0; j<abs(k); j++) {
                    idx = (idx+n)%n;
                    sum += code[idx];
                    idx--;
                }
                res[i] = sum;
            }
        }

        return res;
    }
};`
    },
    2461: {
        problem: `Maximum Sum of Distinct Subarrays With Length K`,
        code:  `class Solution {
public:
    long long maximumSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> mem;
        int n = nums.size();
        
        long long res = 0;
        long long cur = 0;

        for(int i=0; i<k; i++) {
            mem[nums[i]]++;
            cur += nums[i];
        }
        if(mem.size() == k) res = max(res, cur);
        

        for(int i=k; i<n; i++) {
            if(mem[nums[i-k]] > 1) mem[nums[i-k]]--;
            else mem.erase(nums[i-k]);

            mem[nums[i]]++;
            cur += nums[i];
            cur -= nums[i-k];

            if(mem.size() == k) res = max(res, cur);
        }

        return res;
    }
};`
    },
    3042: {
        problem: `Count Prefix and Suffix Pairs I`,
        code:  `class Solution {
public:
    bool isPrefixAndSuffix(string s1, string s2) {
        if(s1.length() > s2.length()) return false;

        for(int i=0; i<s1.length(); i++) {
            if(s1[i]!=s2[i] || s1[s1.length()-1-i]!=s2[s2.length()-1-i]) return false;
        }

        return true;
    }

    int countPrefixSuffixPairs(vector<string>& words) {
        int n = words.size();
        int count = 0;
        
        for(int i=0; i<n; i++) {
            for(int j=i+1; j<n; j++) {
                if(isPrefixAndSuffix(words[i], words[j])) count++;
            }
        }

        return count;
    }
};`
    },
    2185: {
        problem: `Counting Words With a Given Prefix`,
        code:  `class Solution {
public:
    int prefixCount(vector<string>& words, string pref) {
        int count = 0;
        for(auto word:words) {
            if(word.length() < pref.length()) continue;
            if(word.substr(0, pref.length())==pref) count++;
        }
        return count;
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
    }
}